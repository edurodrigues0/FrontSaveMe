import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    onPageChange:(page: number) => void;
}

export function PaginationItem({
    isCurrent = false,
    number,
    onPageChange
}: PaginationItemProps) {
    if(isCurrent) {
        return(
            <Button
                size='sm'
                fontSize='xs'
                width='4'
                colorScheme='purple.600'
                disabled
                _disabled={{
                    bgColor: 'gray.500',
                    cursor: 'default'
                }}
            >
                {number}
            </Button>
        );
    }
    return(
        <Button
            size='sm'
            fontSize='xs'
            width='4'
            bgColor='purple.500'
            _hover={{
                bgColor: 'purple.500'
            }}
            onClick={() => onPageChange(number)}
        >
            {number}
        </Button>
    );
}