<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $tel = str_replace('-' ,'' ,$this->faker->phoneNumber);
        $address = preg_replace('/^(\d|\s+| )+/' ,'' ,$this->faker->address);
        $birthday = str_replace('-' ,'/' ,$this->faker->date);

        return [
            'name'  => $this->faker->name ,
            'kana'  => $this->faker->kanaName ,
            'tel'  => $tel ,
            'email'  => $this->faker->email ,
            'postcode'  => $this->faker->postcode ,
            'address'  => $address ,
            'birthday'  => $birthday,
            'gender'  => $this->faker->boolean ,
            'memo'  => $this->faker->realText(1000) ,
        ];
    }
}
