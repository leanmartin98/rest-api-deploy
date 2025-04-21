const z = require('zod')

// validaciones con ZOD
 const movieSchema = z.object({
        title: z.string({
            invalid_type_error: 'Movie title must be a string',
            required_error: 'Movie title is required'
        }),
        year: z.number().int().positive().min(1900).max(2026),
        director: z.string(),
        duration: z.number().int().positive(),
        rate: z.number().min(0).max(10).default(5),
        poster: z.string().url({
            message: 'Poster must be a valid URL'
        }),
        genre: z.array(
            z.enum(['Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia ficción', 'Fantasia', 'Romance', 'Thriller', 'Crimen', 'Bélico', 'Western', 'Musical', 'Histórico', 'Animación', 'Documental']),
            {
                required_error: 'Movie genre is required.',
                invalid_type_error: 'Movie genre must be an array of enum Genre',
            }
        )
    })

function validateMovie (object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}