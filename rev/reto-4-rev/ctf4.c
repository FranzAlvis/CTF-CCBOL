#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define NUM_CAJAS 5

void mostrar_caja(int numero) {
    printf("  _____\n");
    printf(" /     \\\n");
    printf("/       \\\n");
    printf("|   %d   |\n", numero);
    printf("|       |\n");
    printf("\\       /\n");
    printf(" \\_____/\n");
}

char* obtener_orden_correcto() {
    return "23541";
}

char* obtener_palabra_secreta() {
    return "abracadabra";
}

char* obtener_flag_base64() {
    return "WVdScGRtbHVZVzU2WVY5amIzSnlaV04wWVE9PQ==";
}

int verificar_orden(const char* orden_elegido) {
    return strcmp(orden_elegido, obtener_orden_correcto()) == 0;
}

int verificar_palabra_secreta(const char* palabra) {
    return strcmp(palabra, obtener_palabra_secreta()) == 0;
}

int main() {
    char orden_elegido[6];
    char palabra_mago[20];

    printf("Bienvenido al reto de las cajas mágicas!\n\n");

    for (int i = 0; i < NUM_CAJAS; i++) {
        printf("Elige la caja número %d (del 1 al 5): ", i + 1);
        scanf(" %c", &orden_elegido[i]);
        mostrar_caja(orden_elegido[i] - '0');
        printf("\n");
    }
    orden_elegido[NUM_CAJAS] = '\0';

    if (verificar_orden(orden_elegido)) {
        printf("\n¡Felicidades! Has abierto las cajas en el orden correcto.\n");
        printf("\nPero espera... ¡la flag está protegida por un mago misterioso!\n");
        printf("Para obtenerla, debes decirle una palabra secreta al mago.\n");
        printf("El mago te pide la palabra secreta: ");
        scanf("%19s", palabra_mago);

        if (verificar_palabra_secreta(palabra_mago)) {
            printf("\nEl mago sonríe y te entrega la flag, pero está codificada:\n");
            printf("%s\n", obtener_flag_base64());
            printf("\nAhora debes decodificar la flag para completar el reto.\n");
        } else {
            printf("\nEl mago frunce el ceño. Esa no era la palabra correcta.\n");
        }
    } else {
        printf("\nLo siento, ese no era el orden correcto. Intenta de nuevo.\n");
    }

    return 0;
}
