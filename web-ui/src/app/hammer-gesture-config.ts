import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class HammerConfig extends HammerGestureConfig {
  public overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}
