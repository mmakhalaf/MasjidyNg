
// Represented as the number of minutes since 00:00
export class PrayerTime {
   private static max_time = (60 * 24) - 1;

   constructor(
      public time: number) {
   }

   // Only use the hour/minute from the given date
   static from_date(date: Date): PrayerTime {
      return PrayerTime.from_hour_min(date.getHours(), date.getMinutes());
   }

   static from_hour_min(hours: number, mins: number): PrayerTime {
      return new PrayerTime(hours * 60 + mins);
   }

   is_valid(): boolean {
      return this.time >= 0 && this.time <= PrayerTime.max_time;
   }

   hours_24(): number {
      // Each hour is 60,
      //  min: 0 = 12:00 am
      //  max: (60 * 24) - 1 = 11:59 pm
      return Math.floor(this.time / 60);
   }

   hours_12(): number {
      let h24 = this.hours_24();
      return h24 > 12 ? h24 - 12 : h24;
   }

   is_pm(): boolean {
      let h24 = this.hours_24();
      return h24 > 12;
   }

   minutes(): number {
      return this.time - (this.hours_24() * 60);
   }
}

// Prayer time for the actual time and the jamaa
export class PrayerTimePair {
   constructor(
      public actual: PrayerTime,
      public jamaa: PrayerTime
   ) {

   }

   is_valid(): boolean {
      return this.actual.is_valid();
   }
}

// Prayer times in a day
//
export class DayPrayerTime {
   private static prayer_names = [
      'Fajr',
      'Thuhr',
      'Asr',
      'Maghrib',
      'Ishaa'
   ];

   prayer_times = [
      new PrayerTimePair(null, null),
      new PrayerTimePair(null, null),
      new PrayerTimePair(null, null),
      new PrayerTimePair(null, null),
      new PrayerTimePair(null, null)
      ];

   set_prayer_time(prayer_number: number, time: PrayerTime, jamaa: PrayerTime): boolean {
      if (prayer_number >= 5)
         return false;
      this.prayer_times[prayer_number] = new PrayerTimePair(time, jamaa);
      return true;
   }

   static get_prayer_name(prayer_number: number): string {
      return DayPrayerTime.prayer_names[prayer_number];
   }

   is_valid(): boolean {
      // First, check all the times are valid
      for (let p of this.prayer_times) {
         if (!p.is_valid())
            return false;
      }

      // // Check the prayer times are sorted
      // // We know the jamaa never comes before the prayer
      // //TODO except for maghrib and ishaa
      // let last_time = -1;
      // for (let p of this.prayer_times) {
      //    if (p.time < last_time)
      //       return false;
      //    last_time = p.time;
      // }

      return true;
   }
}

// Holds a map of prayer times (day -> prayer times in that day)
export class PrayerTimes {
   times = new Map<number, DayPrayerTime>();
   constructor() {
   }

   add(date: Date, times: DayPrayerTime) {
      date = new Date(date.getTime());
      date.setHours(0, 0, 0, 0);
      this.times.set(date.getTime(), times);
   }

   get_prayer_times_in_date(date: Date): DayPrayerTime {
      date = new Date(date.getTime());
      date.setHours(0, 0, 0, 0);
      if (this.times.has(date.getTime()))
         return this.times.get(date.getTime());
      else
         return null;
   }

   get_today_prayer_times(): DayPrayerTime {
      return this.get_prayer_times_in_date(new Date(Date.now()));
   }

   prayer_time_to_date(date: Date, ptime: PrayerTime): Date {
      date = new Date(date.getTime());
      date.setHours(ptime.hours_24(), ptime.minutes(), 0, 0);
      return date;
   }

   private get_next_jamaa_prayer_time_in_date(date: Date): SinglePrayerTime {
      let day_prayer_time: DayPrayerTime = this.get_prayer_times_in_date(date);
      if (!day_prayer_time)
         return null;

      let now_pt = PrayerTime.from_date(date);
      for (let i = 0; i < day_prayer_time.prayer_times.length; ++i) {
         let pt = day_prayer_time.prayer_times[i];
         if (pt.jamaa.time > now_pt.time) {
            return new SinglePrayerTime(DayPrayerTime.get_prayer_name(i), this.prayer_time_to_date(date, pt.jamaa));
         }
      }
      return null;
   }

   get_next_jamaa_prayer_time(): SinglePrayerTime {
      let next_pt: SinglePrayerTime = this.get_next_jamaa_prayer_time_in_date(new Date(Date.now()));
      if (next_pt == null) {
         let tomm_date = new Date(Date.now());
         tomm_date.setHours(0, 0, 0, 0);
         tomm_date.setTime(tomm_date.getTime() + (24*60*60*1000));
         next_pt = this.get_next_jamaa_prayer_time_in_date(tomm_date);
      }
      return next_pt;
   }
}

// Represent the prayer time as a stand-alone entity
// where we can identify the day, name, and time.
export class SinglePrayerTime {
   constructor(
      public name: string,
      public date: Date
   ) {
   
   }
}
