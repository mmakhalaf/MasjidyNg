import { Injectable } from '@angular/core';
import { PrayerTimes, DayPrayerTime, PrayerTime, SinglePrayerTime } from '../models/prayer-time';
import { Mosque } from '../models/mosque';

@Injectable({
   providedIn: 'root'
})
export class PrayerTimesService {

   day_ptimes: PrayerTimes = new PrayerTimes();

   constructor() {
      let date = new Date(Date.now());
      date.setHours(0, 0, 0, 0);

      let day1_ptime = new DayPrayerTime();
      day1_ptime.set_prayer_time(0, PrayerTime.from_hour_min(3, 0), PrayerTime.from_hour_min(3, 30));
      day1_ptime.set_prayer_time(1, PrayerTime.from_hour_min(13, 10), PrayerTime.from_hour_min(13, 30));
      day1_ptime.set_prayer_time(2, PrayerTime.from_hour_min(17, 0), PrayerTime.from_hour_min(16, 30));
      day1_ptime.set_prayer_time(3, PrayerTime.from_hour_min(21, 10), PrayerTime.from_hour_min(21, 10));
      day1_ptime.set_prayer_time(4, PrayerTime.from_hour_min(22, 10), PrayerTime.from_hour_min(22, 45));
      this.day_ptimes.add(date, day1_ptime);

      let day2_ptime = new DayPrayerTime();
      day2_ptime.set_prayer_time(0, PrayerTime.from_hour_min(3, 0), PrayerTime.from_hour_min(3, 30));
      day2_ptime.set_prayer_time(1, PrayerTime.from_hour_min(13, 10), PrayerTime.from_hour_min(13, 30));
      day2_ptime.set_prayer_time(2, PrayerTime.from_hour_min(17, 0), PrayerTime.from_hour_min(16, 30));
      day2_ptime.set_prayer_time(3, PrayerTime.from_hour_min(21, 10), PrayerTime.from_hour_min(21, 10));
      day2_ptime.set_prayer_time(4, PrayerTime.from_hour_min(22, 10), PrayerTime.from_hour_min(22, 45));
      this.day_ptimes.add(new Date(date.getTime() + (24*60*60*1000)), day2_ptime);

      let day3_ptime = new DayPrayerTime();
      day3_ptime.set_prayer_time(0, PrayerTime.from_hour_min(3, 0), PrayerTime.from_hour_min(3, 30));
      day3_ptime.set_prayer_time(1, PrayerTime.from_hour_min(13, 10), PrayerTime.from_hour_min(13, 30));
      day3_ptime.set_prayer_time(2, PrayerTime.from_hour_min(17, 0), PrayerTime.from_hour_min(16, 30));
      day3_ptime.set_prayer_time(3, PrayerTime.from_hour_min(21, 10), PrayerTime.from_hour_min(21, 10));
      day3_ptime.set_prayer_time(4, PrayerTime.from_hour_min(22, 10), PrayerTime.from_hour_min(22, 45));
      this.day_ptimes.add(new Date(date.getTime() + (48*60*60*1000)), day3_ptime);
   }

   get_next_prayer_mosque(mosque: Mosque): SinglePrayerTime {
      return this.day_ptimes.get_next_jamaa_prayer_time();
   }
}
