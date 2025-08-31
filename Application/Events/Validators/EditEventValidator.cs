using Application.Activities.Validator;
using Application.Events.Commands;
using Application.Events.Dto;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Events.Validators
{
	public class EditEventValidator : BaseEventValidator<EditEvent.Command, EditEventDto>
	{
		public EditEventValidator() : base(x => x.EventDto)
		{
			RuleFor(x => x.EventDto.Id).NotEmpty().WithMessage("ID is required.");
		}


	}
}
