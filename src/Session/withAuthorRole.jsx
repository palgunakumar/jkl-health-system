import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading/loading";
import { getUserDataById } from "../redux/auth";
import userNotFound from '../assets/images/no-user-found.png';
import { FlexboxGrid, Text } from "rsuite";

const withAuthorRole = (WrappedComponent) => {
  const WithAuthorRole = ({ getUserDetails, user, userLoading, userError }) => {
    const { id } = useParams();

    useEffect(() => {
      if (id) {
        getUserDetails(id);
      }
    }, [id]);

    if (userLoading) {
      return <Loading />;
    }

    if (userError?.code === "USER_NOT_EXISTS" || !user?.roles?.includes('AUTHOR')) {
      return (
        <div  >
         
          <FlexboxGrid justify="center">
            <img style={{ width: '45%' }} src={userNotFound} alt="User Not Found" />
          </FlexboxGrid>
           <FlexboxGrid justify="center">
            <Text>
            The user you are trying to access does not exist or does not have the required author role. Please check the user ID or contact support for assistance.              </Text>
          </FlexboxGrid> 
        </div>
      );
    }

    return <WrappedComponent {...{ user }} />;
  };

  const mapDispatchToProps = dispatch => ({
    getUserDetails: (id) => dispatch(getUserDataById(id)),
  });

  const mapStateToProps = state => ({
    user: state.auth?.userData,
    userLoading: state.auth?.userDataloading,
    userError: state.auth?.userDataerror,
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithAuthorRole);
};

export default withAuthorRole;