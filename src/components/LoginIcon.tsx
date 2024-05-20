import React from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {Box} from "@mui/material";
import {useRouter} from "next/navigation";
import {pages} from "@repo/constants/PAGES";


const LoginIcon = () => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(pages.auth)}>
            <Box display={"flex"}
            alignItems={"center"}
            sx={{cursor: "pointer"}}>
                <span style={{color: "white"}}>Login</span>
                <AccountCircleRoundedIcon sx={{margin: "0 0 0 1em"}}></AccountCircleRoundedIcon>

            </Box>
        </div>
    );
};

export default LoginIcon;