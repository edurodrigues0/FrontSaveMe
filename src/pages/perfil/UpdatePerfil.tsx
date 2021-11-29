import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

import { ButtonPosts } from "../../components/ButtonPosts";
import { FiEdit } from "react-icons/fi";
import { Input } from "../../components/Form/Input";
import api from "../../services/api"
import { toast } from 'react-toastify';
import { useSession } from "next-auth/client";

export function UpdatePerfil() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [session]= useSession();

    const [city, setCity]= useState('');
    const [country, setCountry]= useState('');
    const [whats, setWhats]= useState('');
    
    async function handleCreateNewQuery(event: FormEvent) {
      try {
        event.preventDefault();
        if(city == '' || country == ''|| whats== '')
          return toast.error('Campos vazios');
        await api.put('/user',{
          city,
          country,
          whats,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        })

        toast.success('Perfil atualizado!')
        onClose();
        return;
      } catch {
        toast.error("Erro ao preencher!");
      }

    }


    return (
      <>
        <ButtonPosts
            text='Alterar Dados'
            icon={FiEdit}
            iconSize='20px'
            iconColor='purple.900'
            mt='20px'
            display='flex'
            alignItems='center'
            onClick={onOpen}            
        />
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <Box>
            <ModalOverlay />
            
            <ModalContent onSubmit={handleCreateNewQuery}>
              
              <ModalHeader
                fontSize='xl'
                color='gray.900'
              >
                Alterar Dados
              </ModalHeader>
              
              <ModalCloseButton color='black' />
              
              <ModalBody
                color='gray.900'
              > 
                
                <Input
                  name='title'
                  type='text'
                  value={city}
                  onChange={event => setCity(event.target.value)}
                  label='Escreva a sua cidade'
                  size='md'
                />

                <Input
                  name='title'
                  type='text'
                  value={country}
                  onChange={event => setCountry(event.target.value)}
                  label='Escreva seu estado'
                  size='md'
                />

                <Input
                  name='title'
                  type='text'
                  value={whats}
                  onChange={event => setWhats(event.target.value)}
                  label='Escreva seu Whatsapp'
                  size='md'
                />
               
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme='purple' type='submit' id='description' name='description' onClick={handleCreateNewQuery}>Salvar</Button>
              </ModalFooter>
            </ModalContent>
          </Box>
        </Modal>
      </>
    )
  }