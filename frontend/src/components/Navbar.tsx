import React from 'react';
import '../output.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
    className="h-screen flex bg-none flex-col space-y-5 px-3 py-2"
    style={{ 
        '--width': '250px',
        '--wails-draggable': 'drag'
    } as React.CSSProperties}
    >
                <a>
                    <Link to={"/"}>
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 12V6C20 4.89543 19.1046 4 18 4H12M20 12V18C20 19.1046 19.1046 20 18 20H12M20 12H12M4 12V18C4 19.1046 4.89543 20 6 20H12M4 12V6C4 4.89543 4.89543 4 6 4H12M4 12H12M12 12V4M12 12V20"
                            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </Link>
                </a>
                <a>
                    <Link to={"/groups"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M9 6C9 6.39397 9.0776 6.78407 9.22836 7.14805C9.37913 7.51203 9.6001 7.84274 9.87868 8.12132C10.1573 8.3999 10.488 8.62087 10.852 8.77164C11.2159 8.9224 11.606 9 12 9C12.394 9 12.7841 8.9224 13.1481 8.77164C13.512 8.62087 13.8427 8.3999 14.1213 8.12132C14.3999 7.84274 14.6209 7.51203 14.7716 7.14805C14.9224 6.78407 15 6.39396 15 6C15 5.60603 14.9224 5.21593 14.7716 4.85195C14.6209 4.48797 14.3999 4.15725 14.1213 3.87868C13.8427 3.6001 13.512 3.37912 13.148 3.22836C12.7841 3.0776 12.394 3 12 3C11.606 3 11.2159 3.0776 10.8519 3.22836C10.488 3.37913 10.1573 3.6001 9.87868 3.87868C9.6001 4.15726 9.37912 4.48797 9.22836 4.85195C9.0776 5.21593 9 5.60604 9 6L9 6Z"
                                stroke="#000000" stroke-width="2"></path>
                            <path
                                d="M4.43781 13.9015C4.09663 14.0985 3.79758 14.3607 3.55775 14.6733C3.31792 14.9858 3.142 15.3426 3.04004 15.7231C2.93807 16.1037 2.91206 16.5006 2.96348 16.8912C3.0149 17.2818 3.14275 17.6584 3.33974 17.9996C3.53672 18.3408 3.79897 18.6398 4.11153 18.8796C4.42408 19.1195 4.78081 19.2954 5.16136 19.3974C5.5419 19.4993 5.9388 19.5253 6.32939 19.4739C6.71999 19.4225 7.09663 19.2946 7.43781 19.0977C7.779 18.9007 8.07804 18.6384 8.31787 18.3259C8.5577 18.0133 8.73362 17.6566 8.83559 17.276C8.93756 16.8955 8.96357 16.4986 8.91215 16.108C8.86072 15.7174 8.73287 15.3408 8.53589 14.9996C8.33891 14.6584 8.07665 14.3594 7.7641 14.1195C7.45154 13.8797 7.09481 13.7038 6.71427 13.6018C6.33373 13.4998 5.93683 13.4738 5.54623 13.5252C5.15564 13.5767 4.779 13.7045 4.43781 13.9015L4.43781 13.9015Z"
                                stroke="#000000" stroke-width="2"></path>
                            <path
                                d="M19.5622 13.9015C19.9034 14.0985 20.2024 14.3607 20.4422 14.6733C20.6821 14.9859 20.858 15.3426 20.96 15.7231C21.0619 16.1037 21.0879 16.5006 21.0365 16.8912C20.9851 17.2818 20.8572 17.6584 20.6603 17.9996C20.4633 18.3408 20.201 18.6398 19.8885 18.8796C19.5759 19.1195 19.2192 19.2954 18.8386 19.3974C18.4581 19.4993 18.0612 19.5253 17.6706 19.4739C17.28 19.4225 16.9034 19.2946 16.5622 19.0977C16.221 18.9007 15.922 18.6384 15.6821 18.3259C15.4423 18.0133 15.2664 17.6566 15.1644 17.276C15.0624 16.8955 15.0364 16.4986 15.0879 16.108C15.1393 15.7174 15.2671 15.3408 15.4641 14.9996C15.6611 14.6584 15.9234 14.3594 16.2359 14.1195C16.5485 13.8797 16.9052 13.7038 17.2857 13.6018C17.6663 13.4998 18.0632 13.4738 18.4538 13.5252C18.8444 13.5767 19.221 13.7045 19.5622 13.9015L19.5622 13.9015Z"
                                stroke="#000000" stroke-width="2"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.06962 6.64319C9.02341 6.43253 8.99993 6.217 8.99993 6.0003C8.99993 5.60634 9.07753 5.21623 9.22829 4.85225C9.30001 4.67912 9.3876 4.51352 9.48973 4.35747C9.17327 4.44938 8.86149 4.55879 8.55584 4.68539C7.46391 5.13768 6.47176 5.80062 5.63603 6.63634C4.80031 7.47207 4.13737 8.46422 3.68508 9.55616C3.23279 10.6481 3 11.8184 3 13.0003C3 13.7255 3.08765 14.4464 3.25988 15.1475C3.34396 14.981 3.44359 14.8223 3.55768 14.6736C3.79752 14.361 4.09656 14.0988 4.43774 13.9018C4.62541 13.7935 4.82381 13.706 5.02936 13.6407C5.00983 13.4282 5 13.2145 5 13.0003C5 12.0811 5.18106 11.1708 5.53284 10.3215C5.88462 9.47224 6.40024 8.70057 7.05025 8.05056C7.63547 7.46533 8.31932 6.98905 9.06962 6.64319ZM14.9303 6.64313C15.6806 6.989 16.3645 7.4653 16.9497 8.05055C17.5998 8.70056 18.1154 9.47224 18.4672 10.3215C18.8189 11.1708 19 12.081 19 13.0003C19 13.2145 18.9902 13.4282 18.9706 13.6408C19.1761 13.7061 19.3745 13.7935 19.5621 13.9018C19.9033 14.0988 20.2023 14.361 20.4422 14.6736C20.5563 14.8223 20.656 14.9811 20.7401 15.1476C20.9123 14.4465 21 13.7256 21 13.0003C21 11.8184 20.7672 10.6481 20.3149 9.55615C19.8626 8.46422 19.1997 7.47206 18.364 6.63634C17.5282 5.80061 16.5361 5.13768 15.4441 4.68538C15.1385 4.55876 14.8266 4.44935 14.5101 4.35742C14.6122 4.51348 14.6999 4.6791 14.7716 4.85225C14.9223 5.21623 14.9999 5.60633 14.9999 6.0003C14.9999 6.21698 14.9765 6.43249 14.9303 6.64313ZM18.2303 19.4952C18.0439 19.5056 17.8565 19.4987 17.6705 19.4742C17.2799 19.4228 16.9033 19.2949 16.5621 19.098C16.3746 18.9897 16.1998 18.8617 16.0405 18.7164C15.6169 19.0159 15.1603 19.268 14.6788 19.4675C13.8295 19.8192 12.9193 20.0003 12 20.0003C11.0807 20.0003 10.1705 19.8192 9.32122 19.4675C8.83965 19.268 8.38304 19.0158 7.95941 18.7164C7.80015 18.8616 7.62531 18.9897 7.43775 19.098C7.09656 19.2949 6.71992 19.4228 6.32932 19.4742C6.1434 19.4987 5.95604 19.5056 5.7697 19.4952C6.5768 20.2694 7.52156 20.8868 8.55585 21.3152C9.64778 21.7675 10.8181 22.0003 12 22.0003C13.1819 22.0003 14.3522 21.7675 15.4442 21.3152C16.4784 20.8868 17.4232 20.2694 18.2303 19.4952Z"
                                fill="#000000"></path>
                        </g>
                    </svg>
                    </Link>
                </a>
                <a className="absolute bottom-5" href="#">
                    <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Interface / Settings">
                            <g id="Vector">
                                <path
                                    d="M20.3499 8.92293L19.9837 8.7192C19.9269 8.68756 19.8989 8.67169 19.8714 8.65524C19.5983 8.49165 19.3682 8.26564 19.2002 7.99523C19.1833 7.96802 19.1674 7.93949 19.1348 7.8831C19.1023 7.82677 19.0858 7.79823 19.0706 7.76998C18.92 7.48866 18.8385 7.17515 18.8336 6.85606C18.8331 6.82398 18.8332 6.79121 18.8343 6.72604L18.8415 6.30078C18.8529 5.62025 18.8587 5.27894 18.763 4.97262C18.6781 4.70053 18.536 4.44993 18.3462 4.23725C18.1317 3.99685 17.8347 3.82534 17.2402 3.48276L16.7464 3.1982C16.1536 2.85658 15.8571 2.68571 15.5423 2.62057C15.2639 2.56294 14.9765 2.56561 14.6991 2.62789C14.3859 2.69819 14.0931 2.87351 13.5079 3.22396L13.5045 3.22555L13.1507 3.43741C13.0948 3.47091 13.0665 3.48779 13.0384 3.50338C12.7601 3.6581 12.4495 3.74365 12.1312 3.75387C12.0992 3.7549 12.0665 3.7549 12.0013 3.7549C11.9365 3.7549 11.9024 3.7549 11.8704 3.75387C11.5515 3.74361 11.2402 3.65759 10.9615 3.50224C10.9334 3.48658 10.9056 3.46956 10.8496 3.4359L10.4935 3.22213C9.90422 2.86836 9.60915 2.69121 9.29427 2.62057C9.0157 2.55807 8.72737 2.55634 8.44791 2.61471C8.13236 2.68062 7.83577 2.85276 7.24258 3.19703L7.23994 3.1982L6.75228 3.48124L6.74688 3.48454C6.15904 3.82572 5.86441 3.99672 5.6517 4.23614C5.46294 4.4486 5.32185 4.69881 5.2374 4.97018C5.14194 5.27691 5.14703 5.61896 5.15853 6.3027L5.16568 6.72736C5.16676 6.79166 5.16864 6.82362 5.16817 6.85525C5.16343 7.17499 5.08086 7.48914 4.92974 7.77096C4.9148 7.79883 4.8987 7.8267 4.86654 7.88237C4.83436 7.93809 4.81877 7.96579 4.80209 7.99268C4.63336 8.26452 4.40214 8.49186 4.12733 8.65572C4.10015 8.67193 4.0715 8.68752 4.01521 8.71871L3.65365 8.91908C3.05208 9.25245 2.75137 9.41928 2.53256 9.65669C2.33898 9.86672 2.19275 10.1158 2.10349 10.3872C2.00259 10.6939 2.00267 11.0378 2.00424 11.7255L2.00551 12.2877C2.00706 12.9708 2.00919 13.3122 2.11032 13.6168C2.19979 13.8863 2.34495 14.134 2.53744 14.3427C2.75502 14.5787 3.05274 14.7445 3.64974 15.0766L4.00808 15.276C4.06907 15.3099 4.09976 15.3266 4.12917 15.3444C4.40148 15.5083 4.63089 15.735 4.79818 16.0053C4.81625 16.0345 4.8336 16.0648 4.8683 16.1255C4.90256 16.1853 4.92009 16.2152 4.93594 16.2452C5.08261 16.5229 5.16114 16.8315 5.16649 17.1455C5.16707 17.1794 5.16658 17.2137 5.16541 17.2827L5.15853 17.6902C5.14695 18.3763 5.1419 18.7197 5.23792 19.0273C5.32287 19.2994 5.46484 19.55 5.65463 19.7627C5.86915 20.0031 6.16655 20.1745 6.76107 20.5171L7.25478 20.8015C7.84763 21.1432 8.14395 21.3138 8.45869 21.379C8.73714 21.4366 9.02464 21.4344 9.30209 21.3721C9.61567 21.3017 9.90948 21.1258 10.4964 20.7743L10.8502 20.5625C10.9062 20.5289 10.9346 20.5121 10.9626 20.4965C11.2409 20.3418 11.5512 20.2558 11.8695 20.2456C11.9015 20.2446 11.9342 20.2446 11.9994 20.2446C12.0648 20.2446 12.0974 20.2446 12.1295 20.2456C12.4484 20.2559 12.7607 20.3422 13.0394 20.4975C13.0639 20.5112 13.0885 20.526 13.1316 20.5519L13.5078 20.7777C14.0971 21.1315 14.3916 21.3081 14.7065 21.3788C14.985 21.4413 15.2736 21.4438 15.5531 21.3855C15.8685 21.3196 16.1657 21.1471 16.7586 20.803L17.2536 20.5157C17.8418 20.1743 18.1367 20.0031 18.3495 19.7636C18.5383 19.5512 18.6796 19.3011 18.764 19.0297C18.8588 18.7252 18.8531 18.3858 18.8417 17.7119L18.8343 17.2724C18.8332 17.2081 18.8331 17.1761 18.8336 17.1445C18.8383 16.8247 18.9195 16.5104 19.0706 16.2286C19.0856 16.2007 19.1018 16.1726 19.1338 16.1171C19.166 16.0615 19.1827 16.0337 19.1994 16.0068C19.3681 15.7349 19.5995 15.5074 19.8744 15.3435C19.9012 15.3275 19.9289 15.3122 19.9838 15.2818L19.9857 15.2809L20.3472 15.0805C20.9488 14.7472 21.2501 14.5801 21.4689 14.3427C21.6625 14.1327 21.8085 13.8839 21.8978 13.6126C21.9981 13.3077 21.9973 12.9658 21.9958 12.2861L21.9945 11.7119C21.9929 11.0287 21.9921 10.6874 21.891 10.3828C21.8015 10.1133 21.6555 9.86561 21.463 9.65685C21.2457 9.42111 20.9475 9.25526 20.3517 8.92378L20.3499 8.92293Z"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M8.00033 12C8.00033 14.2091 9.79119 16 12.0003 16C14.2095 16 16.0003 14.2091 16.0003 12C16.0003 9.79082 14.2095 7.99996 12.0003 7.99996C9.79119 7.99996 8.00033 9.79082 8.00033 12Z"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </g>
                    </svg>
                </a>
    </nav>
  );
}

export default Navbar;