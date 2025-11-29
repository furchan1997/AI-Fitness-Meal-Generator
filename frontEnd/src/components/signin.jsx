import { useAuth } from "../context/auth.context";
import { signWithGoogleClick } from "../services/googleSign";

function Signin() {
  const { tokenAuth, logOut } = useAuth();

  return (
    <div>
      {!tokenAuth ? (
        <button
          className="btn btn-primary fw-bold"
          type="submit"
          onClick={() => signWithGoogleClick()}
        >
          התחבר עם גוגל
        </button>
      ) : (
        <button
          className="btn btn-primary fw-bold"
          type="submit"
          onClick={() => logOut()}
        >
          התנתק
        </button>
      )}
    </div>
  );
}

export default Signin;
