#include <stdio.h>
#include <string.h>

#define LONGITUD_BANDERA 35

int verificar_bandera(const char* entrada) {
    if (strlen(entrada) != LONGITUD_BANDERA) return 0;
    if (entrada[0] != 'C') return 0;
    if (entrada[1] != 'C') return 0;
    if (entrada[2] != 'B') return 0;
    if (entrada[3] != 'O') return 0;
    if (entrada[4] != 'L') return 0;
    if (entrada[5] != '_') return 0;
    if (entrada[6] != 'S') return 0;
    if (entrada[7] != 'U') return 0;
    if (entrada[8] != 'C') return 0;
    if (entrada[9] != 'R') return 0;
    if (entrada[10] != 'E') return 0;
    if (entrada[11] != '{') return 0;
    if (entrada[12] != 'a') return 0;
    if (entrada[13] != 'l') return 0;
    if (entrada[14] != 'g') return 0;
    if (entrada[15] != 'o') return 0;
    if (entrada[16] != '_') return 0;
    if (entrada[17] != 's') return 0;
    if (entrada[18] != 'e') return 0;
    if (entrada[19] != '_') return 0;
    if (entrada[20] != 'e') return 0;
    if (entrada[21] != 's') return 0;
    if (entrada[22] != 't') return 0;
    if (entrada[23] != 'a') return 0;
    if (entrada[24] != '_') return 0;
    if (entrada[25] != 'o') return 0;
    if (entrada[26] != 'c') return 0;
    if (entrada[27] != 'u') return 0;
    if (entrada[28] != 'l') return 0;
    if (entrada[29] != 't') return 0;
    if (entrada[30] != 'a') return 0;
    if (entrada[31] != 'n') return 0;
    if (entrada[32] != 'd') return 0;
    if (entrada[33] != 'o') return 0;
    if (entrada[34] != '}') return 0;
    return 1;
}

void procesar_entrada() {
    char entrada[100];
    printf("Ingresa la bandera: ");
    fgets(entrada, sizeof(entrada), stdin);
    entrada[strcspn(entrada, "\n")] = 0;  // Eliminar salto de línea
    
    if (verificar_bandera(entrada)) {
        printf("¡Felicidades! Esa es la banderaaaaaaa.\n");
    } else {
        printf("Lo siento, esa no es la bandera correcta. Intenta de nuevo.\n");
    }
}

int main() {
    procesar_entrada();
    return 0;
}
