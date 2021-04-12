import { Route, Redirect } from 'react-router-dom';

const useRoute = (currentPath: string, destinationPath: string): any => {
  return (
    <Route exact path={currentPath}>
      <Redirect to={destinationPath} />
    </Route>
  )
}

export default useRoute;
