# Calculadora de Taxas

# Solicitar ao usuário as taxas e valores
taxa_mdr = float(input("Digite a taxa de MDR (%): ")) / 100
taxa_antecipacao = float(input("Digite a taxa de antecipação (%): ")) / 100
margem_lucro = float(input("Digite a margem de lucro desejada (%): ")) / 100
valor_transacional = float(input("Digite o valor transacional: "))

# Calcular o lucro
lucro = valor_transacional * (1 - taxa_mdr - taxa_antecipacao) * margem_lucro

# Mostrar o resultado
print(f"O seu lucro será: R$ {lucro:.2f}")