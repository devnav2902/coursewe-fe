import React, { FC } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";
import { User } from "../../../ts/types/user.types";

type Props = {
  social: User["bio"];
};

const SocialBox: FC<Props> = ({ social }) => {
  return (
    <>
      {social?.linkedin && (
        <div className="socical-link">
          <a href="linkedin">
            <AiFillLinkedin /> Linkedin
          </a>
        </div>
      )}

      {social?.twitter && (
        <div className="socical-link">
          <a href="twitter">
            <AiFillTwitterSquare /> Twitter
          </a>
        </div>
      )}

      {social?.facebook && (
        <div className="socical-link">
          <a href="facebook">
            <AiFillFacebook /> Facebook
          </a>
        </div>
      )}

      {social?.youtube && (
        <div className="socical-link">
          <a href="youtube">
            <AiFillYoutube /> Youtube
          </a>
        </div>
      )}
    </>
  );
};

export default SocialBox;
