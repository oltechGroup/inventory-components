import {
  Button,
  Modal,
  Input,
  Avatar,
  Label,
  Slider,
  Spinner,
} from "keep-react";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./context/AuthProvider";
import { CloudArrowUp, Pencil } from "phosphor-react";
import AvatarEditor from "react-avatar-editor";
import { instance } from "../api/instance";
import Swal from "sweetalert2";

function UserProfile() {
  const { user, updateUserData } = useAuth();

  const [userToUpdate, setUserToUpdate] = useState({ ...user });
  const [changesMade, setChangesMade] = useState(false);

  // Modal para actualizar contraseña
  const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const openModalPassword = () => {
    setIsOpenModalPassword(true);
  };
  const closeModalPassword = () => {
    setIsOpenModalPassword(false);
  };
  const handleChangePassword = (e) => {
    setChangePassword((changePassword) => ({
      ...changePassword,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitChangePassword = () => {
    console.log("Antigua contraseña:", changePassword.oldPassword);
    console.log("Nueva contraseña:", changePassword.newPassword);
    closeModalPassword();
    // TODO: Enviar nueva password al backend
  };
  // Final actualizar contraseña

  const handleChangeUpdate = (e) => {
    setUserToUpdate((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const saveChanges = () => {
    setCurrentUser(userToUpdate);
  };

  // Variables/Methods for update avatar
  const [imageInput, setImageInput] = useState(null);
  const [scaleImage, setScaleImage] = useState(1);
  const [sendingUpdateAvatar, setSendingUpdateAvatar] = useState(false);

  const editor = useRef(null);

  const [modalImageCropperOpen, setModalImageCropperOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(user.avatar);

  const openModalImageCropper = () => {
    setModalImageCropperOpen(true);
  };

  const closeModalImageCropper = () => {
    setImageInput(null);
    setModalImageCropperOpen(false);
  };

  // END Variables/Methods for update avatar

  const sendAvatarUpdate = () => {
    if (editor) {
      setSendingUpdateAvatar(true);
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editor.current.getImage();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editor.current.getImageScaledToCanvas();

      // Get the image as a blob
      canvas.toBlob(
        (blob) => {
          instance
            .patch(
              `/users/update-avatar/${user.id}`,
              {
                file: blob,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              Swal.fire({
                title: "Actualizado",
                text: "Se ha actualizado la foto de perfil correctamente",
                icon: "success",
              });
              updateUserData(res.data);
              setSendingUpdateAvatar(false);
              closeModalImageCropper();
            })
            .catch((error) => {
              setSendingUpdateAvatar(false);
              console.error(error);
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al actualizar la foto de perfil",
                icon: "error",
              });
            });
        },
        "image/jpeg",
        0.9
      );
    }
  };

  const isSaveButtonDisabled = !changesMade;

  useEffect(() => {
    const hasChanges = Object.keys(userToUpdate).some(
      (key) => userToUpdate[key] !== user[key]
    );
    setChangesMade(hasChanges);
  }, [user, userToUpdate]);

  return (
    <>
      <h1>Configuración de Perfil</h1>

      {/* Tarjeta del contenido */}
      <div className="flex flex-col gap-4 max-w-2xl p-12 rounded-2xl shadow-lg mx-auto">
        {/* Foto de perfil */}
        <div className="flex gap-6 max-w-max">
          <div className="relative">
            <Avatar
              size="2xl"
              img={user.avatar}
              className="border-primary-500 border-2"
            />
            <button
              className="button bg-blue-500 rounded-full p-2 absolute -bottom-2 -right-2"
              onClick={openModalImageCropper}
            >
              <Pencil className="text-white" />
            </button>
          </div>
          <div className="">
            <h2 className="font-bold text-xl">
              {user.name} {user.lastname}
            </h2>
            <h3 className="text-gray-500 text-lg">{user.role}</h3>
          </div>
        </div>
        {/* Final foto de perfil */}

        <div className="flex flex-col gap-4 mt-5">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-justify">
              Informacion Personal
            </h4>
            <div className="flex gap-4">
              <fieldset className="space-y-1 w-full">
                <Label htmlFor="name">Nombre:</Label>
                <Input
                  id="name"
                  name="name"
                  onChange={handleChangeUpdate}
                  placeholder="Actualiza tu nombre"
                  type="text"
                  value={userToUpdate.name}
                />
              </fieldset>

              <fieldset className="space-y-1 w-full">
                <Label htmlFor="lastname">Apellidos:</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  onChange={handleChangeUpdate}
                  placeholder="Actualiza tus apellidos"
                  type="text"
                  value={userToUpdate.lastname}
                />
              </fieldset>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold text-justify">
              Infomacion de inicio de sesion
            </h4>
            <div className="flex gap-4">
              <fieldset className="space-y-1 w-full">
                <Label htmlFor="email">Correo Electronico:</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={handleChangeUpdate}
                  placeholder="Actualiza tu correo electronico"
                  type="text"
                  value={userToUpdate.email}
                />
              </fieldset>

              <fieldset className="space-y-1 w-full flex items-end">
                <Button
                  color="primary"
                  variant="outline"
                  className="h-max w-full"
                  onClick={openModalPassword}
                >
                  Actualizar contraseña
                </Button>
              </fieldset>
            </div>
          </div>
        </div>
        <Button
          color="primary"
          onClick={saveChanges}
          disabled={isSaveButtonDisabled}
          className="self-end mt-6"
        >
          Guardar Cambios
        </Button>
      </div>

      <Modal isOpen={isOpenModalPassword} onClose={closeModalPassword}>
        <Modal.Body className="space-y-3">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <div className="!mb-6">
              <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                Actualizar Contraseña
              </h3>
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="name">Contraseña Antigua</Label>
                <Input
                  id="name"
                  name="oldPassword"
                  onChange={handleChangePassword}
                  placeholder="Ingresa la contraseña anterior"
                  type="password"
                />
              </fieldset>
              <fieldset className="max-w-md space-y-1">
                <Label htmlFor="name">Nueva Contraseña</Label>
                <Input
                  id="name"
                  name="newPassword"
                  onChange={handleChangePassword}
                  placeholder="Ingresa una nueva contraseña"
                  type="password"
                />
              </fieldset>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button
              onClick={closeModalPassword}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitChangePassword}
              size="sm"
              color="primary"
            >
              Actualizar contraseña
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>

      {/* Modal for update avatar */}
      <Modal isOpen={modalImageCropperOpen} onClose={closeModalImageCropper}>
        <Modal.Body className="space-y-3 min-w-96">
          <Modal.Icon>
            <CloudArrowUp size={28} color="#1B4DFF" />
          </Modal.Icon>
          <Modal.Content>
            <div className="!mb-6">
              <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                Actualizar foto de perfil
              </h3>

              {imageInput ? (
                <>
                  <AvatarEditor
                    ref={editor}
                    image={imageInput}
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={scaleImage}
                    rotate={0}
                  />
                  <Slider
                    min={1}
                    max={2}
                    step={0.1}
                    defaultValue={1}
                    onChange={(value) => setScaleImage(value)}
                  />
                </>
              ) : (
                <div className="input-file__create">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sube una foto
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    name="photo"
                    aria-label="Archivo"
                    onChange={(e) => {
                      setImageInput(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>
              )}
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button
              onClick={closeModalImageCropper}
              size="sm"
              variant="outline"
              color="secondary"
            >
              Cancelar
            </Button>
            {sendingUpdateAvatar ? (
              <Button size="sm">
                <span className="pr-2">
                  <Spinner color="info" size="sm" />
                </span>
                Subiendo imagen...
              </Button>
            ) : (
              <Button
                onClick={sendAvatarUpdate}
                disabled={!imageInput}
                size="sm"
                color="primary"
              >
                Actualizar Foto
              </Button>
            )}
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserProfile;
