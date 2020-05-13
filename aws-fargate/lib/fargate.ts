import { Vpc } from "@aws-cdk/aws-ec2";
import { Cluster, ContainerImage } from "@aws-cdk/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { Construct, Stack, StackProps } from "@aws-cdk/core";

export class GrafanaFargate extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, "GrafanaFargateVPC", {
      maxAzs: 3,
    });

    const cluster = new Cluster(this, "GrafanaFargateCluster", {
      clusterName: "GrafanaFargateCluster",
      vpc: vpc,
    });

    new ApplicationLoadBalancedFargateService(this, "GrafanaFargateService", {
      cluster: cluster,
      cpu: 256,
      desiredCount: 1,
      listenerPort: 3000,
      memoryLimitMiB: 512,
      publicLoadBalancer: true,
      serviceName: "GrafanaFargateService",
      taskImageOptions: {
        containerName: "grafana",
        containerPort: 3000,
        environment: {},
        image: ContainerImage.fromRegistry("grafana/grafana:6.4.1"),
      },
    });
  }
}
