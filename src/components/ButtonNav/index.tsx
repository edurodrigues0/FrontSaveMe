import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface ButtonNavProps {
    totalCountOfQuerys: number;
    registerPerPage?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
}

const siblingsCount = 1;

function generatePageArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1;
    }).filter(page => page > 0)
}

export function ButtonNav({
    totalCountOfQuerys,
    onPageChange,
    currentPage = 1,
    registerPerPage = 1,
}: ButtonNavProps) {
    const lastPage = Math.floor(totalCountOfQuerys) / registerPerPage;

    const previousPages = currentPage > 1 ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
    
    const nextPages = currentPage < lastPage ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

    return(
        <Stack
            direction='row'
            spacing='4'
            justify='space-between'
            align='center'
            p='6'
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>

            <Stack direction='row' spacing='2'>
                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        { currentPage > (2 + siblingsCount) && (
                            <Text color='gray.300' w='6' textAlign='center'>...</Text>
                        )}
                    </>
                )}
                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />

                })}

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem onPageChange={onPageChange} key={page} number={page} />

                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        { (currentPage + 1 + siblingsCount) < lastPage && (
                            <Text color='gray.300' w='6' textAlign='center'>...</Text>
                        )}
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                    </>
                )}
            </Stack>
        </Stack>
    );
}