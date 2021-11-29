import { Flex, IconButton, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { BoxContent } from "../../components/BoxContent";
import { ButtonNav } from "../../components/ButtonNav";
import { FiSearch } from "react-icons/fi";
import { Header } from "../../components/Header";
import { QueryBox } from "./QueryBox";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Search() {
    const [duvidas, setDuvida] = useState([]);
    const [page, setPage] = useState(1);
    const [subject, setSubject] = useState(1);
    const [format, setFormat] = useState(1);
    
    function handleSubmit(e) {
        try {
            e.preventDefault();
            
            api.get(`/duvidas/search?subject=${subject}&format=${format}`).then( response => {
                setDuvida(response.data);
            }).catch(() => {
                toast.error('Não possui nenhuma dúvida com esses dados!');
            })
        } catch {
            toast.error('Erro ao se candidatar!');
        }
    };

    const listSubject = [
        {id: 1, subject: 'Português'},
        {id: 2, subject: 'Matemática'},
        {id: 3, subject: 'Ciência'},
        {id: 4, subject: 'Geografia'},
        {id: 5, subject: 'História'},
    ]
    
    const listFormat = [
        {id: 1, format: 'Remoto'},
        {id: 2, format: 'Presencial'},
    ]
    
    useEffect(() =>{
        api.get('/duvidas').then( response => {
            setDuvida(response.data);
            console.log(duvidas)
        })
    },[]);

    return(
        <>
            <Header />
            <Flex
                maxW={1380}
                m='0 auto'
                h='100vh-80px'
                align='center'
                direction='column'
            >
                <Flex
                    h='100'
                    w='100vw'
                    align='center'
                    justify='center'
                >
                    <Stack onSubmit= {handleSubmit}
                        direction='row'
                        spacing={['2','4']}
                        mb='1'
                    >
                        <Select
                            variant='flushed'
                            size='md'
                            color='purple.500'
                            w={['30','30','sm']}
                            borderColor='purple.500'
                            id='subject'
                            onChange={e => setSubject(Number(e.target.value))}
                        >
                            {listSubject.map((item) =>(
                                <option value={item.id}>{item.subject}</option>
                            ))}
                        </Select>

                        <Select
                            variant='flushed'
                            size='md'
                            color='purple.500'
                            w={['30','30','sm']}
                            borderColor='purple.500'
                            id = 'format'
                            onChange={e => setFormat(Number(e.target.value))}
                        >
                            {listFormat.map((item) =>(
                                <option value={item.id}>{item.format}</option>
                            ))}
                        </Select>
           
                        <IconButton 
                            icon={<FiSearch />} 
                            aria-label='Search database' 
                            color='whiteAlpha' 
                            fontSize='22'
                            type="submit"
                            onClick={handleSubmit}
                            cursor='pointer'
                            variant='unstyled'
                            ml='3'
                        />
                    </Stack>                 
                </Flex>

                <BoxContent title='Resultados' boxHeight='10xl'>
                    {duvidas.map((duvida) =>(
                        <QueryBox key= {duvida.id} query={duvida}/>
                        )
                    )}
                </BoxContent>
                    <ButtonNav 
                        totalCountOfQuerys={duvidas.length}
                        currentPage={page}
                        onPageChange={setPage}
                    />
            </Flex>
        </>
    )
}