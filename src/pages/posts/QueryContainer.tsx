import { Box, Flex, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { FiTrash, FiUsers } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import { ButtonPosts } from '../../components/ButtonPosts';
import { CandidatesList } from '../../components/CandidatesList';
import { UpdateQuery } from './UpdateQuery';
import api from '../../services/api';
import { toast } from 'react-toastify';

export function QueryContainer({query}) {
    const [subject, setSubject] = useState('');

    const listSubject = [
        {id: 1, subject: 'Português'},
        {id: 2, subject: 'Matemática'},
        {id: 3, subject: 'Ciência'},
        {id: 4, subject: 'Geografia'},
        {id: 5, subject: 'História'},
    ]
    
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    
    useEffect(()=>{
        listSubject.map((valor) => {
            if(valor.id == query.subject)
                setSubject(valor.subject)
        });
    })

    async function duvidaDelete(){
       try { 
            await api.delete(`/duvidas/${query.duvida_id}`);
            
            return toast.success("Dúvida deletada!");
        } catch {
            toast.error('Erro ao deletar duvida!');
        }
    }

    return(
        <Stack spacing='4' direction='column' align='center' >
            
                    <Box
                        width='60vw'
                        h='10'
                        mt='8'
                        bg='gray.050'
                        borderRadius='6'
                    >

                        <Flex 
                            align='center' 
                            justify='space-evenly'
                            w='18'
                            h='full'
                        >

                            <Text
                                color='black'
                                fontSize={['11px','15px','sm']}
                                fontWeight='bold'
                                w='300px'
                            >
                                {subject}
                            </Text>
                            
                            <Text
                                color='black'
                                fontSize={['11px','15px','sm']}
                                fontWeight='bold'
                                w='300px'
                            >
                                {query.title}
                            </Text>

                            
                            <Flex 
                                justify='flex-end' 
                                w='sm'
                                align='center'
                            >
                                <CandidatesList props={query}/>
                                
                                <UpdateQuery props= {query}/>

                                <ButtonPosts
                                    icon={FiTrash}
                                    iconColor='black'
                                    iconSize='20'
                                    variant='unstyled'
                                    onClick={duvidaDelete}
                                />
                            </Flex>
                        </Flex>
                    </Box>
           
        </Stack>
    );
}