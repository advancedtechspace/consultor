import axios from 'axios';

export const colors = {
  primary: "indigo",
};

export const areas = [
  
  { id: "engel", label: "Electricidade" },
  { id: "eletnc", label: "Electrônica" },
  { id: "engmec", label: "Mecânica" },
  { id: "engcivil", label: "Construção Civil" },
  { id: "inf", label: "Informática" },
  { id: "vidfot", label: "Video e fotografia" },
  { id: "carp", label: "Carpintaria" },
  { id: "serr", label: "Serralharia" },
  { id: "gard", label: "Jardinagem" },
  { id: "painting", label: "Pintura" },
  { id: "engagr", label: "Agrónomia" },
  { id: "arq", label: "Arquitectura" },
  { id: "gest", label: "Gestão & Administração" },
  { id: "cont", label: "Contabilidade" },
  { id: "econ", label: "Economia & Finanças" },
  { id: "mkt", label: "Marketing & Publicidade" },
  { id: "dir", label: "Direito" },
  { id: "math", label: "Matemática" },
  { id: "ing", label: "Inglês" },
  { id: "pt", label: "Português" },
  { id: "qui", label: "Química" },
  { id: "fi", label: "Física" },
  { id: "psy", label: "Psicologia" },
];

export const checkAuth = () => {
  return localStorage.getItem("user");
};

export const api_url =
  window.location.protocol === "https:"
    ? "https://carpal-fearless-find.glitch.me"
    : "http://localhost:8000";

export class FormValidator {
  contact(c) {
    const condition1 = c.length == 9;
    const condition2 = c.charAt(0) == 8;
    const condition3 = [2, 3, 4, 5, 6, 7].includes(parseInt(c.charAt(1)));

    return condition1 && condition2 && condition3;
  }
}

export const notify = () => {
  Notification.requestPermission((perm) => {
    if (perm === "granted") {
      Notification;
      new Notification("Hi", {
        icon: 'logo',
        body: "This is the body",
      });
    }
  });
}

export const api = axios.create({
  baseURL: api_url,
  headers: {
    'user': checkAuth()
  }
});