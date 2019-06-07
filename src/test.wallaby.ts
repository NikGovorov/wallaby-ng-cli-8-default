import './polyfills';

import '@angular-devkit/build-angular/src/angular-cli-files/models/jit-polyfills';

import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
