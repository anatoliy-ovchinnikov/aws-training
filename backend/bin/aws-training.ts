#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsTrainingStack } from '../lib/aws-training-stack';

const app = new cdk.App();
new AwsTrainingStack(app, 'AwsTrainingStack');
