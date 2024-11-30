import {useNavigate, useParams} from 'react-router-dom'

const withNavigation = (Component) => props =>  {
    return <Component {...props} navigate={useNavigate()} />;
  }
  
  const withParams  = (Component) => props =>  {
    return <Component {...props} params={useParams()} />;
  }

export { withNavigation, withParams };