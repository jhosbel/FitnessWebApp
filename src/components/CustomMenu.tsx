import React from 'react';

const CustomMenu = ({ row }:any) => {
  const handleMenuClick = () => {
    // Aquí puedes agregar la lógica para manejar el clic en el menú
    console.log('Menú personalizado clicado para:', row.title);
  };

  return (
    <div>
      <button onClick={handleMenuClick}>Abrir menú</button>
    </div>
  );
};

export default CustomMenu;