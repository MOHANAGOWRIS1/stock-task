import { bootstrapApplication } from '@angular/platform-browser';
import * as echarts from 'echarts/core';
import { appConfig } from './app/app.config';
import { provideEcharts } from 'ngx-echarts';
import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));


bootstrapApplication(App, {
  ...appConfig,             // keep your existing appConfig
  providers: [
    ...(appConfig.providers || []), // merge existing providers
    provideEcharts()        // ✅ inject NGX_ECHARTS_CONFIG globally
  ]
}).catch(err => console.error(err));