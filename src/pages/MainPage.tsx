import "../styles/MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="content-container">
        <section className="site-info">
          <h1>Добро пожаловать!</h1>
          <p>
            Это образовательная платформа, созданная для студентов и преподавателей. Здесь вы найдете
            информацию об университетах, курсах по объектно-ориентированному программированию (ООП) и
            другие полезные ресурсы для обучения и развития.
          </p>
        </section>

        <section className="updates">
          <h2>Последние обновления</h2>
          <div className="updates-list">
            <div className="update-item">
              <h3>Добавлена страница ООП</h3>
              <p>29 мая 2025</p>
              <p>Новая страница с материалами по объектно-ориентированному программированию.</p>
            </div>
            <div className="update-item">
              <h3>Обновление интерфейса</h3>
              <p>25 мая 2025</p>
              <p>Улучшена навигация и адаптивность сайдбара для мобильных устройств.</p>
            </div>
            <div className="update-item">
              <h3>Добавлена авторизация</h3>
              <p>20 мая 2025</p>
              <p>Теперь пользователи могут регистрироваться и входить в систему.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MainPage;