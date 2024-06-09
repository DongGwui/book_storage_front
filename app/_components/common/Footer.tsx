import React from 'react';
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <section>
            <div className="flex justify-center items-center bg-neutral-50 h-80">
                <div className="font-extrabold text-3xl">
                    Let make a Book!
                </div>
            </div>
            <div className="flex justify-center items-center bg-white h-36">
                <div className="logo font-bold text-xl p-3 mx-5">
                    logo
                </div>
                <div className="mx-5">
                    <ul className="flex flex-row">
                        <li className="p-2">menu1</li>
                        <li className="p-2">menu2</li>
                        <li className="p-2">menu3</li>
                        <li className="p-2">menu4</li>
                        <li className="p-2">menu5</li>
                    </ul>
                </div>
                <div className="mx-5">
                    <ul className="flex flex-row">
                        <li className="p-2"><FaTwitter/></li>
                        <li className="p-2"><FaFacebook/></li>
                        <li className="p-2"><FaInstagram/></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Footer;