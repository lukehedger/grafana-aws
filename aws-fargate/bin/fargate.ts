#!/usr/bin/env node
import { App } from "@aws-cdk/core";
import { GrafanaFargate } from "../lib/fargate";

const app = new App();

new GrafanaFargate(app, "GrafanaFargate");
