import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS szamla (id INTEGER PRIMARY KEY AUTOINCREMENT, szerző STRING, cím STRING, kategória STRING, tartalom STRING, kelte DATETIME, módosítva DATETIME)`).run()

export const getAllSzamla = () => db.prepare(`SELECT * FROM szamla`).all()
export const createSzamla = (szerzo, cim, kategoria, tartalom ) => {const now = new Date().toISOString(); db.prepare(`INSERT INTO szamla (szerző,cím,kategória,tartalom,kelte,módosítva) VALUES (?,?,?,?,?,?)`).run(szerzo, cim, kategoria, tartalom, now, now); return result.lastInsertRowid;   }
export const setSzamla = (id, szerzo, cim, kategoria, tartalom) => {const now = new Date().toISOString(); db.prepare(`UPDATE szamla SET szerző = ?,cím = ?,kategória = ?,tartalom = ?,módosítva = ? WHERE id = ? `).run(szerzo, cim, kategoria, tartalom, now,id)}
export const deleteSzamla = (id) => db.prepare(`DELETE FROM szamla WHERE id = ?`).run(id)

const szamlak = [
    {
      szerző: "Dr. Tóth András",
      cím: "A trauma hosszú távú hatásai",
      kategória: "Traumapszichológia",
      tartalom: "A traumára adott lehetséges pszichés reakciók.",
    },
    {
        szerző: "Dr. Bálint Eszter",
        cím: "A függőség nem akaratgyengeség",
        kategória: "Addiktológia",
      tartalom: "Miért alakulnak ki addikciók.",
    },
    {
        szerző: "Dr. Varga Katalin",
        cím: "Borderline személyiségzavar belülről",
        kategória: "Személyiségzavarok",
      tartalom: "Az érintettek belső világába.",
    }
  ];
  if (getAllSzamlas().length === 0) {
    szamlak.forEach(szamla =>{
      createSzamla(szamla.szerző, szamla.cím, szamla.kategória, szamla.tartalom)
    })
  }
  