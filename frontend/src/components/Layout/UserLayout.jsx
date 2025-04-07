import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

/**
* Define a estrutura básica de layout para páginas de usuário
* Inclui cabeçalho (Header), conteúdo principal (via Outlet) e rodapé (Footer)
*/
const UserLayout = () => {
 return (
   <>
     {/* Cabeçalho */}
     <Header />
     {/* Conteúdo principal */}
     <main>
       <Outlet />
     </main>
     {/* Rodapé */}
     <Footer />
   </>
 );
};
export default UserLayout;