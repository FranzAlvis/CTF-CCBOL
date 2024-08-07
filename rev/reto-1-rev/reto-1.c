#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void display_image() {
    printf("  ___    ___   _____   _____    _     \n");
    printf(" / __|  / __| |  ___) | __  |  | |    \n");
    printf("| |    | |    | |__)  | | | |  | |    \n");
    printf("| |__  | |__  | |_)_  | |_| |  | |__  \n");
    printf("\'___|   \'___| |_____) |_____|  |____| \n");
    printf("                                      \n");
}

int validate_part1(const char *input) {
    const char part1[] = "CCBOL_SUCRE{";
    return strncmp(input, part1, strlen(part1)) == 0;
}

int validate_part2(const char *input) {
    const char part2[] = "una_bandera_facil}";
    return strcmp(input, part2) == 0;
}

int main() {
    display_image();
    
    char input[50];
    
    printf("=========Verifica tu Flag==========\n");
    printf("Ingrese la Flag: ");
    scanf("%49s", input);

    char part1[13];
    char part2[37];
    strncpy(part1, input, 12);
    part1[12] = '\0';
    strncpy(part2, input + 12, 36);
    part2[36] = '\0';

    if (validate_part1(part1) && validate_part2(part2)) {
        printf("Felicidades! Esta flag es correcta: %s\n", input);
    } else {
        printf("Incorrecto! Vuelva a intentarlo.\n");
    }

    return 0;
}
