#include <stdio.h>
#include <string.h>

void mostrar_logo() {
    printf("  #####    ##    ####   #####  #####  #\n");
    printf(" #     #  #  #  #    # #     # #      #\n");
    printf(" #       #    # #    # #       #      #\n");
    printf(" #       ###### ####   #       #####  #\n");
    printf(" #     # #    # #   #  #     # #      #\n");
    printf("  #####  #    # #    #  #####  #####  ######\n");
    printf("\n");
}

char* obtener_clave_celda() {
    return "lib" "ertad";
}

char obtener_pin_parte1() {
    return '1';
}

char obtener_pin_parte2() {
    return '9';
}

char obtener_pin_parte3() {
    return '8';
}

char obtener_pin_parte4() {
    return '4';
}

char* obtener_flag_cifrada() {
    return "oleuhffero";
}

void descifrar_cesar(char *texto, int desplazamiento) {
    for (int i = 0; texto[i] != '\0'; i++) {
        if (texto[i] >= 'a' && texto[i] <= 'z') {
            texto[i] = ((texto[i] - 'a' - desplazamiento + 26) % 26) + 'a';
        }
    }
}

int main() {
    char clave[20];
    char pin[5];
    char flag[20];

    mostrar_logo();

    printf("Estás en la celda. Ingresa la clave para abrir: ");
    scanf("%19s", clave);

    if (strcmp(clave, obtener_clave_celda()) != 0) {
        printf("Clave incorrecta. La alarma se ha activado.\n");
        return 1;
    }

    printf("La celda se ha abierto. Has pasado la primera prueba.\n\n");

    printf("Ahora estás frente a la puerta principal.\n");
    printf("Ingresa el PIN de 4 dígitos: ");
    scanf("%4s", pin);

    char pin_correcto[5] = {
        obtener_pin_parte1(),
        obtener_pin_parte2(),
        obtener_pin_parte3(),
        obtener_pin_parte4(),
        '\0'
    };

    if (strcmp(pin, pin_correcto) != 0) {
        printf("PIN incorrecto. La puerta permanece cerrada.\n");
        return 1;
    }

    printf("La puerta se ha abierto. Has pasado la segunda prueba.\n\n");


    printf("¡Felicidades! Has superado todas las pruebas y escapado de la prisión.\n");
    
    strcpy(flag, obtener_flag_cifrada());
    descifrar_cesar(flag, 3);  
    printf("Tu flag es: %s\n", flag);

    return 0;
}
