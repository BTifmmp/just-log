import journal from './meta/_journal.json';
import m0000 from './0000_volatile_the_captain.sql';
import m0001 from './0001_init-exercises.sql';

export default {
  journal,
  migrations: {
    m0000,
    m0001
  }
}
