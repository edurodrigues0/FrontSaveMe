import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BoxContent } from "../../components/BoxContent";
import { CreateQuery } from "./CreateQuery";
import { Header } from '../../components/Header';
import { QueryContainer } from "./QueryContainer";
import api from '../../services/api';
import { useSession } from "next-auth/client";

export default function Posts() {
    const [session] = useSession();
    const [duvidas, setDuvida] = useState([]);

    const sizes = useBreakpointValue({
        base: '20',
        lg: '40',
    })

   useEffect(() =>{
        if(!session)
            return;
    
        api.get(`/duvidas/user/${session.user.email}`).then( response => {
            setDuvida(response.data);
        })
        
    });

    return session ? (
        <>
            <Header />
            <Flex
                maxW={1380}
                m='0 auto'
                h='100vh-80px'
                align='center'
                direction='column'
            >
                <BoxContent title='Duvidas Postadas' boxHeight='xl'>
                    {duvidas.map((duvida) =>(
                        <QueryContainer key= {duvida.id} query = {duvida}/>
                    ))}
                    
                </BoxContent>
                
                <CreateQuery />
            </Flex>
        </>
    ) : (
        <>
            <Header />
            <Flex
                maxW={1380}
                m='0 auto'
                h='100vh-80px'
                align='center'
                direction='column'
            >
                <BoxContent 
                    title='Faça o login e tire dúvidas' 
                    boxHeight='xl'>
                </BoxContent>
            </Flex>
        </>
    )
}