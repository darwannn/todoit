import { Link } from "react-router-dom";
import AuthenticationCard from "../components/AuthenticationCard";

const LandingPage = () => {
  return (
    <AuthenticationCard title="">
      <p>
        Stay organized, prioritize tasks, and achieve your goals with ease.
        Whether you&apos;re managing work projects, personal errands, or
        long-term plans, our app helps you stay on track. Add tasks, set
        deadlines, and get reminders to ensure nothing falls through the cracks.
      </p>
      <Link to={"/auth/register"} className="btn-secondary mt-3">
        Get Started
      </Link>
      <div className="text-gray-500 text-center">
        <span>Already have an account?</span>{" "}
        <Link
          to={"/auth/login"}
          className="transition-all hover:text-gray-700 "
        >
          Login
        </Link>
      </div>
    </AuthenticationCard>
  );
};

export default LandingPage;
