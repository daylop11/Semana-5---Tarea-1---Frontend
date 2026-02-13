import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";

export const config: ApplicationConfig = {
  providers: [provideHttpClient(withFetch())],
};