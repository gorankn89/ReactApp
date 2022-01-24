import * as gradebooksSagas from "./gradebooks/sagas";
import * as teachersSagas from "./teachers/sagas";
import * as authSagas from "./auth/sagas";

const sagas = {
  ...gradebooksSagas,
  ...teachersSagas,
  ...authSagas,
};

export default sagas;