import Dashboard from '@/components/DashboardTrainer'
import WithPrivateRouter from '@/components/WithPrivateRoute';


 function index() {
  return (
    <div >
      <Dashboard />

    </div>
  );
}
export default WithPrivateRouter(index)