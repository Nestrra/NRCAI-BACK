import OpenAI from "openai"



interface Options {
    prompt: string
}


export const orthographyCheckUseCase = async ( openai:OpenAI,  options: Options) => {

    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [
                { 
                    role: "system", 
                    content: `Te enviaran palabras o textos en español, que posiblemente tengan errores de ortografia,
                    tu tarea es realizar la corrección y regresar en formato JSON un porcentaje de palabras si errores, un array con los errores y un mensaje al usuario
                    como en el siguiente ejemplo. 
                    ejemplo de salida:
                    {
                        userScore:number,
                        errors:string[] // ['error->solucion'],
                        message:string, // usa emojis y texto pa felicitar al usuario, ejemplo mensaje:tienes un de palabras correctas
                    }   
                    `
                },
                { 
                    role: 'user', 
                    content: prompt
                }
            ],
        model: 'gpt-3.5-turbo',
        temperature:0.3,
        max_tokens:80,
      });

      console.log(completion)
      console.log(completion.choices[0])

      const jsonresponse = JSON.parse(completion.choices[0].message.content);

    return  jsonresponse;
}
