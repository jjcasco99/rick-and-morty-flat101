import { useContext, useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { EpisodeContext } from "./context/EpisodeContext";

const TABS = {
  EPISODES: "EPISODES",
  LOCATIONS: "LOCATIONS"
}

const Home = () => {
  const [activeTab, setActiveTab] = useState(TABS.EPISODES)
  return <section>
    <Header title={"Rick and Morty"} />
    <Tabs 
        activeTab={activeTab}
        onClick={(value) => setActiveTab(value)}
        options={[
        {
          title: "Episodios",
          value: TABS.EPISODES
        },
          {
          title: "Localizaciones",
          value: TABS.LOCATIONS
        },
    ]}/>
    {activeTab === TABS.EPISODES ? <Episodes /> : <>Locations</>}
  </section>;
}

const Tabs = ({ options, activeTab, onClick }) => {
  return (
    <div className="flex items-center justify-center bg-purple-400 pt-2">
        {options?.map(opt => (
          <button
            key={opt?.value}
            onClick={() => onClick(opt?.value)}
            className={`
              ${activeTab === opt?.value && "border-b-4 border-red-500"}
              px-4 py-1 w-full`}
          >
            {opt?.title}
          </button>
        ))}
    </div>
  )
}

const Episodes = () => {
  const { mockData } = useContext(EpisodeContext)
  return <section>
    {mockData?.data?.episodes?.results?.map(ep => {
      return (
      <div className="px-2 bg-amber-300 py-1 mb-1" key={ep?.id}>
        <Link to={`episode/${ep?.name?.toLocaleLowerCase()}`}>
            <p className="text-[10px] font-semibold text-gray-600">{ep?.episode}</p>
            <h4 className="text-xl">{ep?.name}</h4>
            <p className="text-gray-600 text-[14px]">{ep?.air_date}</p>
        </Link>
      </div>
      )
    })}
  </section>;
}

const Header = ({ title, backTo }) => {
  return (
    <header className="flex items-center gap-2 bg-red-500 w-full p-4">
      {backTo && <Link to={`/${backTo}`}>🔙</Link>}
      <h1 className="">{title}</h1>
    </header>
  )
}

const Episode = () => {
  const { name } = useParams(); 
  const { mockEpisode, mockData } = useContext(EpisodeContext)
  const episode = mockEpisode?.data?.episodes?.results?.[0] 
  return (
    <div className="bg-orange-400">
    <Header 
      title={mockData?.data?.episodes?.results?.find(ep => ep?.name?.toLocaleLowerCase() === name)?.name} 
      backTo={"/"}
    />
    <section>
      <p>{episode?.episode}: {episode?.name}</p>
      <p>{episode?.air_date}</p>
      <p>Personajes</p>
      <Carrusel options={episode?.characters} />
      <EpisodeForm />
    </section>
    </div>
  )
}

const Carrusel = ({ options }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      {options?.map(opt => (
        <div key={opt?.id} className="flex flex-col shrink-0 items-center gap-2 w-24">
          <img className="rounded-full w-20 h-20 object-cover" alt={opt?.name} src={opt?.image} />
          <p className="text-xs text-center w-full truncate">{opt?.name}</p>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/episode/:name" element={<Episode />} />
    </Routes>
  );
}

export default App

const EpisodeForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Nombre
    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Email inválido";
    }

    // Comentario
    if (!form.comment.trim()) {
      newErrors.comment = "El comentario es obligatorio";
    } else if (form.comment.length > 500) {
      newErrors.comment = "Máximo 500 caracteres";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
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

      console.log("Respuesta:", data);

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        comment: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          className="w-full border bg-white"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          className="w-full border bg-white"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label>Comentario</label>
        <textarea
          name="comment"
          value={form.comment}
          className="w-full border bg-white"
          onChange={handleChange}
        />

        <small>{form.comment.length}/500</small>

        {errors.comment && <p>{errors.comment}</p>}
      </div>

      <button type="submit">Enviar</button>

      {success && <p>Comentario enviado correctamente</p>}
    </form>
  );
}