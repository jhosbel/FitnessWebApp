/* eslint-disable react-hooks/exhaustive-deps */
import useAuthAndApi from "@/app/api/training";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import EyeOn from "./icons/EyeOn";
import EyeOff from "./icons/EyeOff";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  trainingList: [
    {
      _id: string;
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
      _id: string;
      title: string;
      start: string;
      userEmail: string;
    }
  ];
  userConfig: {
    _id: string;
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
    if (session?.user) {
      setUserConfigId(session.user.userConfig[0]._id);
      getOneUserConfig(session.user.userConfig[0]._id)
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
    <section className="flex max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg justify-center p-10 flex-1">
      <div className="flex-1">
        {userConfig && (
          <>
            <p>Configuraciones de usuario</p>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
            <p>Edad: {userConfig.age}</p>
            <p>Altura: {userConfig.height}</p>
            <p>Peso: {userConfig.weight}</p>
          </>
        )}
        <button onClick={openModal2}>Actualizar datos</button>
      </div>
      <div className="flex-1"></div>
      <Modal isOpen={open2} onClose={() => setOpen2(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <button onClick={openModal}>Cambiar contraseña</button>
          <input
            onChange={handleUserConfig}
            value={userUpdate.name}
            name="name"
            type="text"
            placeholder="Nombre"
          />
          <input
            onChange={handleUserConfig}
            value={userUpdate.email}
            name="name"
            type="text"
            placeholder="Correo"
          />
          <input
            onChange={handleUserConfig}
            value={userUpdate.age}
            name="age"
            type="text"
            placeholder="Edad"
          />
          <input
            onChange={handleUserConfig}
            value={userUpdate.height}
            name="height"
            type="text"
            placeholder="Altura"
          />
          <input
            onChange={handleUserConfig}
            value={userUpdate.weight}
            name="weight"
            type="text"
            placeholder="Peso"
          />
          <button>Actualizar</button>
        </form>
      </Modal>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmitChangePassword} className="flex flex-col">
          <div className="flex">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Vieja contraseña"
              name="oldPassword"
              onChange={handlePass}
              value={newPassword.oldPassword}
            />
            <span onClick={handleTogglePassword}>
              {showPass ? <EyeOn /> : <EyeOff />}
            </span>
          </div>
          <div className="flex">
            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Nueva Contraseña"
              name="newPassword2"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <span onClick={handleTogglePassword2}>
              {showPass2 ? <EyeOn /> : <EyeOff />}
            </span>
          </div>
          <div className="flex">
            <input
              type={showPass3 ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              name="newPassword"
              onChange={handlePass}
              value={newPassword.newPassword}
            />
            <span onClick={handleTogglePassword3}>
              {showPass3 ? <EyeOn /> : <EyeOff />}
            </span>
          </div>
          <button>Cambiar contraseña</button>
        </form>
      </Modal>
    </section>
  );
};

export default UserSettings;
