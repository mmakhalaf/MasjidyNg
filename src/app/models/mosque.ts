
export class MosqueCoord {
   constructor(
      public x_coord: number = 0,
      public y_coord: number = 0
   ) {
   }

   clone(): MosqueCoord {
      return new MosqueCoord(this.x_coord, this.y_coord);
   }
}

export class Mosque {
   private lines: Array<string> = null;
   constructor(
      public id: number,
      public name: string,
      public coords: MosqueCoord = null,
      public address: string = ''
      ) {
   }

   clone(): Mosque {
      return new Mosque(this.id, this.name, this.coords.clone(), this.address);
   }

   address_lines(): Array<string> {
      if (this.lines == null)
         this.lines = this.address.split(',');
      return this.lines;
   }

   address_line(idx: number): string {
      if (this.lines == null)
         this.lines = this.address.split(',');
      if (this.lines.length == 0 || idx >= this.lines.length)
         return '';
      else {
         return this.lines[idx];
      }
   }
}

export class MosqueList extends Array<Mosque> {
   private constructor() {
      super();
   }

   static create(): MosqueList {
      // Workaround JS not allowing inheritence of Array<>
      return Object.create(MosqueList.prototype);
   }

   clone(): MosqueList {
      let cp = MosqueList.create();
      for (let m of this) {
         cp.push(m.clone());
      }
      return cp;
   }

   from(mosques: MosqueList | Array<Mosque> | Mosque[]) {
      this.splice(0, this.length);
      for (let m of mosques) {
         this.push(m);
      }
   }

   get_mosque_from_id(id: number | string): Mosque {
      for (let m of this) {
         if (`${m.id}` == id) {
            return m;
         }
      }
      return null;
   }
}