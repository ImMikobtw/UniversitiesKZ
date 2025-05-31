import "../styles/Logo.css"

const Logo = () => {
  return (
    <>
      <div className="logo-container" style={{  flex: 1 }}>
        <div className="year-container">
            <h3 className="year">2025</h3>
            <div className="year-place"></div>
        </div>
        <div className="Logo">
          <h1 className="logo-text">Университеты</h1>
          <h1 className="logo-text">Казахстана</h1>
        </div>
        <div className="after-logo">
          <h4 className="after-logo-pr">
            Данный сайт дает возможность добавлять
          </h4>
          <h4 className="after-logo-pr">
            и изменять информацию о ВУЗ-ах 
          </h4>
          <h4 className="after-logo-pr">
            Республики Казахстан 
          </h4>
        </div>
      </div>
    </>
  );
};

export default Logo;