import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";


export const DetailForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({success: false, data: {}});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Email inválido";
    }

    if (!form.comment.trim()) {
      newErrors.comment = "El comentario es obligatorio";
    } else if (form.comment.length > 500) {
      newErrors.comment = "Máximo 500 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      setSuccess({success: true, data});
      console.log("Response:" , success?.data);
      
      setForm({
        name: "",
        email: "",
        comment: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fieldClass = "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-teal-400 transition-colors"
  const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5"
  const errorClass = "text-xs text-red-400 mt-1"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-zinc-500 uppercase">Deja un comentario</p>

      <div>
        <label className={labelClass}>Nombre</label>
        <Input
          type="text"
          name="name"
          className={fieldClass}
          placeholder="Tu nombre"
          value={form.name}
          onChange={onChange}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <Input
          type="email"
          name="email"
          className={fieldClass}
          placeholder="tu@email.com"
          value={form.email}
          onChange={onChange}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <label className={labelClass}>Comentario</label>
        <textarea
          name="comment"
          value={form.comment}
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Escribe tu comentario... (máx 500 caracteres)"
          onChange={onChange}
        />
        {errors.comment && <p className={errorClass}>{errors.comment}</p>}
      </div>

      <Button
        className="w-full bg-teal-400 hover:bg-teal-300 active:bg-teal-500 text-zinc-900 font-semibold text-sm py-3 rounded-lg transition-colors"
      >
        Enviar
      </Button>

      {success?.success && (
        <p className="text-center text-sm text-teal-400">Comentario enviado correctamente</p>
      )}
    </form>
  );
}