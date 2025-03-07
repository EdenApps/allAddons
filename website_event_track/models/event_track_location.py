# -*- coding: utf-8 -*-
# Part of Eden. See LICENSE file for full copyright and licensing details.

from eden import fields, models


class TrackLocation(models.Model):
    _name = "event.track.location"
    _description = 'Event Track Location'
    _order = 'sequence, id'

    name = fields.Char('Location', required=True)
    sequence = fields.Integer(default=10, help='Define the order in which the location will appear on "Agenda" page')
