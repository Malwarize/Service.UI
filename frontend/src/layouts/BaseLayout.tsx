import Navbar from '../components/Navbar';

function BaseLayout({ children }: any) {
  return (
    <div className="bg-primary-purple border-opacity-50 rounded-3xl overflow-hidden">
      <div className="flex">
        <Navbar />
        <div className="flex-1 pl-3 rounded-3xl bg-primary-gray pt-5 px-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BaseLayout;