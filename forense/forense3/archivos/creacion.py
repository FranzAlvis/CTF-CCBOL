import binascii

def cifrar_mensaje(mensaje):
    binario = ''.join(format(ord(c), '08b') for c in mensaje)
    return binario.replace('0', ' ').replace('1', '\u2003')

mensaje = 'CCBOL_SUCRE{esto_es_un_mensaje_secreto}'
cifrado = cifrar_mensaje(mensaje)

with open('mensaje.txt', 'w', encoding='utf-8') as f:
    f.write(cifrado)

print("Archivo cifrado generado: mensaje.txt")
