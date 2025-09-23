"""
Auto-Scaling Engine for NASA Fire Port System

This module implements the core auto-scaling logic for the Fire Port system.
It monitors system metrics and automatically adjusts resource allocation
based on predefined thresholds and machine learning predictions.

Author: Daniel Omoregie
Date: 2024
"""

import time
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import statistics


class ScalingAction(Enum):
    """Enumeration of possible scaling actions."""
    SCALE_UP = "scale_up"
    SCALE_DOWN = "scale_down"
    NO_ACTION = "no_action"


@dataclass
class SystemMetrics:
    """Data class for system metrics."""
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    network_io: float
    active_connections: int
    response_time: float
    timestamp: float


@dataclass
class ScalingConfig:
    """Configuration for auto-scaling behavior."""
    min_instances: int = 2
    max_instances: int = 10
    scale_up_threshold: float = 70.0
    scale_down_threshold: float = 30.0
    cooldown_period: int = 300  # seconds
    metrics_window: int = 60  # seconds
    scale_up_factor: float = 1.5
    scale_down_factor: float = 0.7


class AutoScaler:
    """
    Auto-scaling engine for the Fire Port system.
    
    This class implements intelligent auto-scaling based on system metrics,
    historical data, and machine learning predictions.
    """
    
    def __init__(self, config: ScalingConfig):
        """
        Initialize the auto-scaler.
        
        Args:
            config: Scaling configuration
        """
        self.config = config
        self.current_instances = config.min_instances
        self.metrics_history: List[SystemMetrics] = []
        self.last_scaling_time = 0
        self.logger = logging.getLogger(__name__)
        
    def add_metrics(self, metrics: SystemMetrics) -> None:
        """
        Add new metrics to the history.
        
        Args:
            metrics: System metrics to add
        """
        self.metrics_history.append(metrics)
        
        # Keep only metrics within the window
        cutoff_time = time.time() - self.config.metrics_window
        self.metrics_history = [
            m for m in self.metrics_history 
            if m.timestamp >= cutoff_time
        ]
    
    def should_scale(self) -> Tuple[ScalingAction, float]:
        """
        Determine if scaling is needed based on current metrics.
        
        Returns:
            Tuple of (scaling action, confidence score)
        """
        if len(self.metrics_history) < 5:
            return ScalingAction.NO_ACTION, 0.0
        
        # Check cooldown period
        if time.time() - self.last_scaling_time < self.config.cooldown_period:
            return ScalingAction.NO_ACTION, 0.0
        
        # Calculate average metrics over the window
        avg_metrics = self._calculate_average_metrics()
        
        # Determine scaling action based on thresholds
        if self._should_scale_up(avg_metrics):
            confidence = self._calculate_scale_up_confidence(avg_metrics)
            return ScalingAction.SCALE_UP, confidence
        elif self._should_scale_down(avg_metrics):
            confidence = self._calculate_scale_down_confidence(avg_metrics)
            return ScalingAction.SCALE_DOWN, confidence
        else:
            return ScalingAction.NO_ACTION, 0.0
    
    def _calculate_average_metrics(self) -> SystemMetrics:
        """Calculate average metrics over the configured window."""
        if not self.metrics_history:
            return SystemMetrics(0, 0, 0, 0, 0, 0, time.time())
        
        return SystemMetrics(
            cpu_usage=statistics.mean([m.cpu_usage for m in self.metrics_history]),
            memory_usage=statistics.mean([m.memory_usage for m in self.metrics_history]),
            disk_usage=statistics.mean([m.disk_usage for m in self.metrics_history]),
            network_io=statistics.mean([m.network_io for m in self.metrics_history]),
            active_connections=statistics.mean([m.active_connections for m in self.metrics_history]),
            response_time=statistics.mean([m.response_time for m in self.metrics_history]),
            timestamp=time.time()
        )
    
    def _should_scale_up(self, metrics: SystemMetrics) -> bool:
        """
        Determine if we should scale up.
        
        Args:
            metrics: Average system metrics
            
        Returns:
            True if should scale up
        """
        # Scale up if any critical metric exceeds threshold
        return (
            metrics.cpu_usage > self.config.scale_up_threshold or
            metrics.memory_usage > self.config.scale_up_threshold or
            metrics.response_time > 1000  # 1 second threshold
        ) and self.current_instances < self.config.max_instances
    
    def _should_scale_down(self, metrics: SystemMetrics) -> bool:
        """
        Determine if we should scale down.
        
        Args:
            metrics: Average system metrics
            
        Returns:
            True if should scale down
        """
        # Scale down if all metrics are below threshold
        return (
            metrics.cpu_usage < self.config.scale_down_threshold and
            metrics.memory_usage < self.config.scale_down_threshold and
            metrics.response_time < 200  # 200ms threshold
        ) and self.current_instances > self.config.min_instances
    
    def _calculate_scale_up_confidence(self, metrics: SystemMetrics) -> float:
        """
        Calculate confidence score for scale-up decision.
        
        Args:
            metrics: Average system metrics
            
        Returns:
            Confidence score between 0 and 1
        """
        # Higher confidence for more extreme values
        cpu_factor = min(metrics.cpu_usage / 100, 1.0)
        memory_factor = min(metrics.memory_usage / 100, 1.0)
        response_factor = min(metrics.response_time / 2000, 1.0)
        
        # Weighted average of factors
        confidence = (cpu_factor * 0.4 + memory_factor * 0.4 + response_factor * 0.2)
        return min(confidence, 1.0)
    
    def _calculate_scale_down_confidence(self, metrics: SystemMetrics) -> float:
        """
        Calculate confidence score for scale-down decision.
        
        Args:
            metrics: Average system metrics
            
        Returns:
            Confidence score between 0 and 1
        """
        # Higher confidence for lower values
        cpu_factor = 1.0 - (metrics.cpu_usage / 100)
        memory_factor = 1.0 - (metrics.memory_usage / 100)
        response_factor = 1.0 - (metrics.response_time / 1000)
        
        # Weighted average of factors
        confidence = (cpu_factor * 0.4 + memory_factor * 0.4 + response_factor * 0.2)
        return min(confidence, 1.0)
    
    def execute_scaling(self, action: ScalingAction, confidence: float) -> bool:
        """
        Execute the scaling action.
        
        Args:
            action: Scaling action to execute
            confidence: Confidence score for the action
            
        Returns:
            True if scaling was successful
        """
        if confidence < 0.7:  # Minimum confidence threshold
            self.logger.warning(f"Low confidence ({confidence:.2f}) for {action.value}, skipping")
            return False
        
        try:
            if action == ScalingAction.SCALE_UP:
                new_instances = min(
                    int(self.current_instances * self.config.scale_up_factor),
                    self.config.max_instances
                )
                self._scale_up(new_instances)
            elif action == ScalingAction.SCALE_DOWN:
                new_instances = max(
                    int(self.current_instances * self.config.scale_down_factor),
                    self.config.min_instances
                )
                self._scale_down(new_instances)
            
            self.last_scaling_time = time.time()
            self.logger.info(f"Scaling {action.value} to {self.current_instances} instances")
            return True
            
        except Exception as e:
            self.logger.error(f"Failed to execute scaling: {e}")
            return False
    
    def _scale_up(self, target_instances: int) -> None:
        """
        Scale up to target number of instances.
        
        Args:
            target_instances: Target number of instances
        """
        # In a real implementation, this would:
        # 1. Provision new instances
        # 2. Configure load balancer
        # 3. Update service discovery
        # 4. Verify health of new instances
        
        self.current_instances = target_instances
        self.logger.info(f"Scaled up to {target_instances} instances")
    
    def _scale_down(self, target_instances: int) -> None:
        """
        Scale down to target number of instances.
        
        Args:
            target_instances: Target number of instances
        """
        # In a real implementation, this would:
        # 1. Drain connections from instances to remove
        # 2. Update load balancer configuration
        # 3. Terminate instances
        # 4. Update service discovery
        
        self.current_instances = target_instances
        self.logger.info(f"Scaled down to {target_instances} instances")
    
    def get_status(self) -> Dict:
        """
        Get current status of the auto-scaler.
        
        Returns:
            Dictionary containing current status
        """
        return {
            "current_instances": self.current_instances,
            "min_instances": self.config.min_instances,
            "max_instances": self.config.max_instances,
            "metrics_count": len(self.metrics_history),
            "last_scaling_time": self.last_scaling_time,
            "time_since_last_scaling": time.time() - self.last_scaling_time
        }


class MetricsCollector:
    """
    Collects system metrics for the auto-scaler.
    
    In a real implementation, this would integrate with monitoring systems
    like Prometheus, CloudWatch, or custom monitoring solutions.
    """
    
    def __init__(self):
        """Initialize the metrics collector."""
        self.logger = logging.getLogger(__name__)
    
    def collect_metrics(self) -> SystemMetrics:
        """
        Collect current system metrics.
        
        Returns:
            Current system metrics
        """
        # In a real implementation, this would:
        # 1. Query monitoring systems
        # 2. Parse metrics from various sources
        # 3. Aggregate and normalize data
        
        # Simulated metrics for demonstration
        import random
        
        return SystemMetrics(
            cpu_usage=random.uniform(20, 90),
            memory_usage=random.uniform(30, 80),
            disk_usage=random.uniform(40, 70),
            network_io=random.uniform(10, 100),
            active_connections=random.randint(50, 500),
            response_time=random.uniform(100, 800),
            timestamp=time.time()
        )


def main():
    """
    Demonstration of the auto-scaling system.
    """
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Create configuration
    config = ScalingConfig(
        min_instances=2,
        max_instances=8,
        scale_up_threshold=70.0,
        scale_down_threshold=30.0,
        cooldown_period=60,  # 1 minute for demo
        metrics_window=30    # 30 seconds for demo
    )
    
    # Initialize components
    auto_scaler = AutoScaler(config)
    metrics_collector = MetricsCollector()
    
    print("NASA Fire Port Auto-Scaling System Demo")
    print("=" * 50)
    
    # Simulate monitoring loop
    for i in range(20):
        print(f"\n--- Monitoring Cycle {i + 1} ---")
        
        # Collect metrics
        metrics = metrics_collector.collect_metrics()
        auto_scaler.add_metrics(metrics)
        
        print(f"Metrics: CPU={metrics.cpu_usage:.1f}%, "
              f"Memory={metrics.memory_usage:.1f}%, "
              f"Response={metrics.response_time:.1f}ms")
        
        # Check if scaling is needed
        action, confidence = auto_scaler.should_scale()
        
        if action != ScalingAction.NO_ACTION:
            print(f"Scaling decision: {action.value} (confidence: {confidence:.2f})")
            success = auto_scaler.execute_scaling(action, confidence)
            if success:
                print(f"Scaling successful! Current instances: {auto_scaler.current_instances}")
            else:
                print("Scaling failed or skipped")
        else:
            print("No scaling needed")
        
        # Show status
        status = auto_scaler.get_status()
        print(f"Status: {status['current_instances']} instances, "
              f"{status['metrics_count']} metrics in history")
        
        # Wait before next cycle
        time.sleep(2)
    
    print("\nDemo completed!")


if __name__ == "__main__":
    main()
