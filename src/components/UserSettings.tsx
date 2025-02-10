/* eslint-disable react-hooks/exhaustive-deps */
import useAuthAndApi from "@/app/api/training";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import EyeOn from "./icons/EyeOn";
import EyeOff from "./icons/EyeOff";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  trainingList: [
    {
      id: string;
      title: string;
      exercises: [
        {
          name: string;
          muscle: string;
          equipment: string;
          image: string;
        }
      ];
    }
  ];
  calendarData: [
    {
      id: string;
      title: string;
      start: string;
      userEmail: string;
    }
  ];
  userConfig: {
    id: string;
    age: string;
  };
}

interface UserConfig {
  age?: string;
  height?: string;
  weight?: string;
}

const UserSettings = () => {
  const { data: session, status } = useSession();
  const {
    getOneUser,
    getOneUserConfig,
    updateOneUserConfig,
    updateUser,
    updateUserPassword,
  } = useAuthAndApi();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user, setUser] = useState<UserData>();
  const [userId, setUserId] = useState("");
  const [userConfigId, setUserConfigId] = useState("");
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
  });
  const [newPassword, setNewPassword] = useState({
    email: session?.user.email,
    oldPassword: "",
    newPassword: "",
  });
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);

  useEffect(() => {
    if (session?.user.id) {
      setUserId(session?.user.id);
      getOneUser(session?.user?.id)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
    if (session?.user?.userConfig) {
      setUserConfigId(session.user.userConfig.id);
      getOneUserConfig(session.user.userConfig.id)
        .then((res) => res.json())
        .then((data) => setUserConfig(data));
    }
  }, [status, session]);

  const openModal = () => {
    setOpen(true);
  };

  const openModal2 = () => {
    setOpen2(true);
  };

  const handleUserConfig = (e: any) => {
    const { name, value } = e.target;
    setUserUpdate((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUserConfig = { ...userUpdate };
      if (!updatedUserConfig.name && user?.name) {
        updatedUserConfig.name = user.name;
      }
      if (!updatedUserConfig.email && user?.email) {
        updatedUserConfig.email = user.email;
      }
      if (!updatedUserConfig.age && userConfig?.age) {
        updatedUserConfig.age = userConfig.age;
      }
      if (!updatedUserConfig.height && userConfig?.height) {
        updatedUserConfig.height = userConfig.height;
      }
      if (!updatedUserConfig.weight && userConfig?.weight) {
        updatedUserConfig.weight = userConfig.weight;
      }
      const res2 = await updateUser(userId, updatedUserConfig);
      if (res2.ok) {
        const updateUserConfig = await res2.json();
        setUser(updateUserConfig);
        setUserUpdate({ name: "", email: "", age: "", height: "", weight: "" });
      }
      const res = await updateOneUserConfig(userConfigId, updatedUserConfig);
      if (res.ok) {
        const updateUserConfig = await res.json();
        setUserConfig(updateUserConfig);
        setUserUpdate({ name: "", email: "", age: "", height: "", weight: "" });
      } else {
        console.error("Failed to update user config:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating user config:", error);
    }
  };

  const handlePass = (e: any) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      if (pass !== newPassword.newPassword)
        return console.log("las contraseñas no coinciden");
      if (pass === newPassword.newPassword) {
        const res = await updateUserPassword(newPassword);
        if (res.ok) {
          setNewPassword({
            email: session?.user.email,
            oldPassword: "",
            newPassword: "",
          });
        }
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña: ", error);
    }
  };

  const handleTogglePassword = () => {
    setShowPass((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePassword2 = () => {
    setShowPass2((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePassword3 = () => {
    setShowPass3((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="flex mt-20 max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg justify-center p-10 flex-1">
      <div className="flex-1 flex flex-col gap-8 text-[#334155]">
        {userConfig && (
          <>
            <p>Configuraciones de usuario</p>
            <p>Nombre: {user?.name}</p>
            <p>Corre: {user?.email}</p>
            <p>Tipo de usuario: {user?.role === 'admin' ? 'Administrador' : user?.role === 'user' ? 'Usuario' : ''}</p>
            <p>Edad: {userConfig.age}</p>
            <p>Altura: {userConfig.height} cm</p>
            <p>Peso: {userConfig.weight} kg</p>
          </>
        )}
        <button
          onClick={openModal2}
          className={`
                bg-slate-700 hover:bg-slate-800 
                px-3 py-2 
                block w-full 
                text-white 
                transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500 
                      `}
        >
          Actualizar datos
        </button>
      </div>
      <div className="flex-1"></div>
      <Modal isOpen={open2} onClose={() => setOpen2(false)}>
        <div className="flex gap-8 items-center">
          <button
            onClick={openModal}
            className={`
                bg-slate-700 hover:bg-slate-800 
                px-3 py-2 
                block w-full 
                text-white 
                transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500
                flex-1
                      `}
          >
            Cambiar contraseña
          </button>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleUserConfig}
                value={userUpdate.name}
                name="name"
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleUserConfig}
                value={userUpdate.email}
                name="email"
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Correo
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleUserConfig}
                value={userUpdate.age}
                name="age"
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="age"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Edad
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleUserConfig}
                value={userUpdate.height}
                name="height"
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="height"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Altura
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={handleUserConfig}
                value={userUpdate.weight}
                name="weight"
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="weight"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Peso
              </label>
            </div>
            <button
              className={`
                bg-slate-700 hover:bg-slate-800 
                px-3 py-2 
                block w-full 
                text-white 
                transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500 
                      `}
            >
              Actualizar
            </button>
          </form>
        </div>
      </Modal>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={handleSubmitChangePassword}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type={showPass ? "text" : "password"}
                placeholder=" "
                name="oldPassword"
                onChange={handlePass}
                value={newPassword.oldPassword}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="oldPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contraseña antigua
              </label>
            </div>
            <span onClick={handleTogglePassword}>
              {showPass ? <EyeOn /> : <EyeOff />}
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type={showPass2 ? "text" : "password"}
                placeholder=" "
                name="newPassword2"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="newPassword2"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Contraseña nueva
              </label>
            </div>
            <span onClick={handleTogglePassword2}>
              {showPass2 ? <EyeOn /> : <EyeOff />}
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type={showPass3 ? "text" : "password"}
                placeholder=" "
                name="newPassword"
                onChange={handlePass}
                value={newPassword.newPassword}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirmar contraseña
              </label>
            </div>
            <span onClick={handleTogglePassword3}>
              {showPass3 ? <EyeOn /> : <EyeOff />}
            </span>
          </div>
          <button
            className={`
                bg-slate-700 hover:bg-slate-800 
                px-3 py-2 
                block w-full 
                text-white 
                transition rounded-lg disabled:bg-opacity-75 disabled:bg-green-500
                      `}
          >
            Cambiar contraseña
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default UserSettings;
