
import React, { useMemo, useState } from "react";

const palette = {
  olive: "#3F4A2C",
  oliveDark: "#303A22",
  ivory: "#F7F4EC",
  beige: "#D7C8AA",
  white: "#FFFFFF",
  ink: "#292B24",
};

function crearId(nombre, pases) {
  const datos = JSON.stringify({ nombre, pases });
  const invertido = datos.split("").reverse().join("");
  const utf8 = unescape(encodeURIComponent(invertido));

  return btoa(utf8)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const campo = document.createElement("textarea");
    campo.value = texto;
    campo.style.position = "fixed";
    campo.style.left = "-9999px";
    document.body.appendChild(campo);
    campo.select();

    const resultado = document.execCommand("copy");
    document.body.removeChild(campo);
    return resultado;
  }
}

function Separador() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-[#D7C8AA]" />
      <span className="h-[6px] w-[6px] rotate-45 border border-[#D7C8AA]" />
      <span className="h-px w-12 bg-[#D7C8AA]" />
    </div>
  );
}

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState("1");
  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [copiado, setCopiado] = useState("");
  const [error, setError] = useState("");

  const limpiar = () => {
    setLink("");
    setMensaje("");
    setCopiado("");
    setError("");
  };

  const generar = () => {
    const nombreLimpio = nombre.trim();
    const cantidad = Number(pases);

    if (!nombreLimpio) {
      setError("Escribe el nombre del invitado o familia.");
      return;
    }

    if (
      !Number.isSafeInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > 500
    ) {
      setError("Ingresa un número de pases válido, entre 1 y 500.");
      return;
    }

    const id = crearId(nombreLimpio, cantidad);

    const url =
      `${window.location.origin}/?id=${encodeURIComponent(id)}`;

    const textoPases =
      cantidad === 1
        ? "1 lugar"
        : `${cantidad} lugares`;

    const texto = `🌿 Reconfirmación de asistencia 🌿

Hola ${nombreLimpio} 🤍

¡Ya falta poco para nuestra boda!

Para ayudarnos a organizar todos los detalles de este día tan especial, nos gustaría pedirte que reconfirmes tu asistencia.

🎟️ Lugares reservados: ${textoPases}

Te agradeceríamos mucho que nos confirmaras antes del 6 de noviembre de 2026, mediante el siguiente enlace:

${url}

Si tus planes han cambiado, no hay ningún problema. Solamente te pedimos que nos lo hagas saber.

¡Muchas gracias por acompañarnos en este momento tan especial!

Con cariño,
Eimy & Soni 🤍`;

    setLink(url);
    setMensaje(texto);
    setError("");
    setCopiado("");
  };

  const copiarContenido = async (valor, tipo) => {
    if (!valor) return;
    const ok = await copiar(valor);
    setCopiado(ok ? tipo : "error");
  };

  const cantidadPreview = useMemo(() => {
    const n = Number(pases);
    return Number.isSafeInteger(n) && n > 0 ? n : 1;
  }, [pases]);

  const inputClass =
    "w-full min-w-0 rounded-none border border-[#D7C8AA] bg-white px-4 py-3.5 font-serif text-[16px] text-[#292B24] outline-none focus:border-[#3F4A2C]";

  const botonClass =
    "w-full min-w-0 border border-[#3F4A2C] bg-[#3F4A2C] px-4 py-3.5 font-serif text-sm text-white transition hover:bg-[#303A22] disabled:opacity-50";

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden px-4 py-12 sm:px-8 sm:py-20"
      style={{
        backgroundColor: palette.olive,
        color: palette.ivory,
      }}
    >
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#D7C8AA]">
          Eimy Edith & Andre Soni
        </p>

        <div className="my-6">
          <Separador />
        </div>

        <h1 className="font-cursiveDancing text-5xl sm:text-6xl">
          Generador
        </h1>

        <p className="mt-3 font-serif text-xl">
          de reconfirmaciones
        </p>

        <p className="mx-auto mt-5 max-w-lg font-serif text-sm leading-7 text-[#F7F4EC]">
          Crea un enlace personalizado para que cada
          invitado reconfirme su asistencia.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {/* FORMULARIO */}
        <section className="min-w-0 border border-[#D7C8AA] bg-white p-5 text-[#292B24] sm:p-9">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#3F4A2C]">
            Datos del invitado
          </p>

          <h2 className="mt-3 font-serif text-2xl text-[#303A22]">
            Crear reconfirmación
          </h2>

          <div className="my-6">
            <Separador />
          </div>

          <div>
            <label
              htmlFor="nombre-generador"
              className="mb-2 block font-serif text-sm"
            >
              Nombre del invitado o familia
            </label>

            <input
              id="nombre-generador"
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                limpiar();
              }}
              placeholder="Ej. Familia Hernández"
              className={inputClass}
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="pases-generador"
              className="mb-2 block font-serif text-sm"
            >
              Lugares asignados
            </label>

            <input
              id="pases-generador"
              type="number"
              min="1"
              max="500"
              step="1"
              inputMode="numeric"
              value={pases}
              onChange={(e) => {
                setPases(e.target.value);
                limpiar();
              }}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-[#706E64]">
              Escribe manualmente los pases asignados.
              El invitado no podrá reconfirmar más de ese número.
            </p>
          </div>

          {error && (
            <p role="alert" className="mt-5 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={generar}
            className={`${botonClass} mt-8`}
          >
            Generar enlace de reconfirmación
          </button>

          {link && (
            <div className="mt-8 space-y-5 border-t border-[#D7C8AA] pt-7">
              <div>
                <label className="mb-2 block font-serif text-sm">
                  Enlace personalizado
                </label>

                <textarea
                  readOnly
                  rows={3}
                  value={link}
                  className={`${inputClass} resize-none break-all text-sm`}
                />

                <button
                  type="button"
                  onClick={() => copiarContenido(link, "link")}
                  className={`${botonClass} mt-3`}
                >
                  {copiado === "link"
                    ? "✓ Enlace copiado"
                    : "Copiar enlace"}
                </button>
              </div>

              <div>
                <label
                  htmlFor="mensaje-generador"
                  className="mb-2 block font-serif text-sm"
                >
                  Mensaje de WhatsApp editable
                </label>

                <textarea
                  id="mensaje-generador"
                  rows={15}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className={`${inputClass} resize-y text-sm leading-6`}
                />

                <button
                  type="button"
                  onClick={() => copiarContenido(mensaje, "mensaje")}
                  className={`${botonClass} mt-3`}
                >
                  {copiado === "mensaje"
                    ? "✓ Mensaje copiado"
                    : "Copiar mensaje"}
                </button>
              </div>

              {copiado === "error" && (
                <p className="text-sm text-red-700">
                  No se pudo copiar automáticamente.
                  Selecciona y copia el texto manualmente.
                </p>
              )}
            </div>
          )}
        </section>

        {/* VISTA PREVIA */}
        <section className="min-w-0 border border-[#D7C8AA] bg-[#F7F4EC] p-5 text-center sm:p-9">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#3F4A2C]">
            Vista previa
          </p>

          <div className="mt-7 border border-[#D7C8AA] bg-white p-3">
            <div className="border border-[#3F4A2C] px-5 py-14 sm:px-8">
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#3F4A2C]">
                Eimy & Soni
              </p>

              <h3 className="mt-7 font-cursiveDancing text-4xl text-[#303A22] sm:text-5xl">
                Reconfirmación
              </h3>

              <div className="my-7">
                <Separador />
              </div>

              <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#706E64]">
                Invitación reservada para
              </p>

              <p className="mt-4 break-words font-serif text-2xl text-[#3F4A2C]">
                {nombre.trim() || "Invitado especial"}
              </p>

              <p className="mt-5 font-serif text-lg text-[#303A22]">
                {cantidadPreview}{" "}
                {cantidadPreview === 1
                  ? "LUGAR"
                  : "LUGARES"}
              </p>

              <p className="mt-8 font-serif text-xs uppercase tracking-[0.15em] text-[#706E64]">
                27 de noviembre de 2026
              </p>
            </div>
          </div>

          <p className="mt-7 font-serif text-sm leading-7 text-[#303A22]">
            Los invitados podrán indicar si asistirán
            y cuántos lugares utilizarán.
          </p>
        </section>
      </div>
    </main>
  );
}
